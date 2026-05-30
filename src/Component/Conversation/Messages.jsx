import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Client } from "@twilio/conversations";
import {
  generateToken,
  getMessages,
  getUserConversations,
  sendMessage,
  getChatUsers,
  createConversation,
  deleteConversation,
  // ধরে নিচ্ছি আপনার apis/api.js ফাইলে এই ফাংশনটি এক্সপোর্ট করা আছে
  // markAsRead api call -> axios.post('/chat/mark-as-read', payload)
} from "../../apis/api"; 

import styles from "./Messages.module.scss";
import { FiMoreVertical, FiSearch, FiSend, FiSmile, FiUsers } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { BsMicFill, BsPauseFill, BsTrashFill } from "react-icons/bs";

import axios from "axios"; // আপনার কাস্টম axios ইন্সট্যান্স থাকলে সেটি ব্যবহার করুন

export default function Messages() {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?._id || user?.id;

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [twilioClient, setTwilioClient] = useState(null);

  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // ================= VOICE =================
  const [isListening, setIsListening] = useState(false);
  const {
    interimTranscript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const detectLanguage = (text) => {
    const bengaliRegex = /[\u0980-\u09FF]/;
    const hindiRegex = /[\u0900-\u097F]/;
    if (bengaliRegex.test(text)) return "bn";
    if (hindiRegex.test(text)) return "hi";
    return "en";
  };

  const startVoiceTyping = async () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support voice typing");
      return;
    }
    setIsListening(true);
    await SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: "en-IN",
    });
  };

  const pauseVoiceTyping = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const deleteVoiceTyping = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    resetTranscript();
    setMessageText("");
  };

  // ✅ মার্জ করা একক Voice Transcript Effect
  useEffect(() => {
    if (!finalTranscript) return;

    const detected = detectLanguage(finalTranscript);
    console.log("Detected Language:", detected);

    setMessageText((prev) => {
      if (prev.includes(finalTranscript)) return prev;
      return prev ? `${prev} ${finalTranscript}` : finalTranscript;
    });

    resetTranscript();
  }, [finalTranscript, resetTranscript]);

  useEffect(() => {
    if (!isListening) {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  // ================= MARK AS READ MUTATION =================
  const markAsReadMutation = useMutation({
    mutationFn: async (payload) => {
      // ব্যাকএন্ডের markAsRead এন্ডপয়েন্টে রিকোয়েস্ট পাঠাবে
      return await axios.post("/chat/mark-as-read", payload); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-conversations", currentUserId] });
    }
  });

  const triggerMarkAsRead = (convSid, lastIndex = null) => {
    if (!convSid || !currentUserId) return;
    markAsReadMutation.mutate({
      conversationSid: convSid,
      identity: currentUserId,
      lastReadMessageIndex: lastIndex
    });
  };

  // ================= TWILIO INITIALIZATION =================
  useEffect(() => {
    if (currentUserId && !twilioClient) {
      tokenMutation.mutate();
    }
  }, [currentUserId]);

  const tokenMutation = useMutation({
    mutationKey: ["generate-token"],
    mutationFn: async () => {
      return await generateToken({ identity: currentUserId });
    },
    onSuccess: async (data) => {
      try {
        const token = data?.token || data?.data?.token;
        if (!token) return;
        const client = await Client.create(token);
        setTwilioClient(client);
      } catch (error) {
        console.log("Twilio client error:", error);
      }
    },
  });

  // ================= USERS & CONVERSATIONS FETCH =================
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["chat-users"],
    queryFn: async () => {
      const res = await getChatUsers();
      return res?.data || res;
    },
    enabled: !!currentUserId,
  });

  const users = useMemo(() => {
    const allUsers = usersData?.users || [];
    return allUsers.filter((u) => String(u._id) !== String(currentUserId));
  }, [usersData, currentUserId]);

  const { data: conversationData, refetch: refetchConversations } = useQuery({
    queryKey: ["user-conversations", currentUserId],
    queryFn: async () => {
      const res = await getUserConversations(currentUserId);
      return res?.data || res;
    },
    enabled: !!currentUserId,
  });
  const conversations = conversationData?.conversations || [];

  // ================= MUTATIONS =================
  const { mutate: createConversationMutate, isPending: creatingConversation } = useMutation({
    mutationFn: async (payload) => {
      const res = await createConversation(payload);
      return res?.data || res;
    },
    onSuccess: async (data) => {
      const newConversation = data?.conversation;
      if (newConversation) {
        setSelectedConversation(newConversation);
        triggerMarkAsRead(newConversation.twilioConversationSid);
      }
      await refetchConversations();
    },
  });

  const deleteConversationMutation = useMutation({
    mutationFn: async (conversationSid) => {
      return await deleteConversation(conversationSid);
    },
    onSuccess: async () => {
      setSelectedConversation(null);
      setAllMessages([]);
      await refetchConversations();
    },
  });

  const handleSelectUser = async (selectedUserData) => {
    const existingConversation = conversations.find(
      (conv) =>
        !conv?.isGroup &&
        conv?.participants?.some((p) => String(p?._id || p) === String(selectedUserData._id))
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
      setSelectedUser(selectedUserData);
      // ✅ চ্যাট সিলেক্ট করার সাথে সাথে আনরিড মেসেজ ক্লিয়ার করার জন্য
      triggerMarkAsRead(existingConversation.twilioConversationSid);
      return;
    }

    createConversationMutate({
      friendlyName: selectedUserData.fullname,
      participants: [currentUserId, selectedUserData._id],
      isGroup: false,
    });
    setSelectedUser(selectedUserData);
  };

  // ================= MESSAGES FETCH =================
  const { data: messageData, refetch: refetchMessages } = useQuery({
    queryKey: ["conversation-messages", selectedConversation?.twilioConversationSid],
    queryFn: async () => {
      const res = await getMessages(selectedConversation?.twilioConversationSid);
      return res?.data || res;
    },
    enabled: !!selectedConversation?.twilioConversationSid,
  });

  useEffect(() => {
    if (messageData?.messages) {
      setAllMessages(messageData.messages);
      // ✅ নতুন মেসেজ লোড হওয়ার পর সর্বশেষ ইনডেক্সটি রিড মার্ক করুন
      if (messageData.messages.length > 0) {
        const lastMsgIndex = messageData.messages[messageData.messages.length - 1].index;
        triggerMarkAsRead(selectedConversation?.twilioConversationSid, lastMsgIndex);
      }
    }
  }, [messageData]);

  // ================= REALTIME EVENT LISTENERS =================
  useEffect(() => {
    if (!twilioClient) return;

    const handleConversationAdded = async () => {
      await refetchConversations();
    };

    const handleMessageAdded = async (message) => {
      await refetchMessages();
      await refetchConversations();

      // ✅ অ্যাক্টিভ চ্যাটে মেসেজ আসলে নিজে রাইটার না হলে রিড মার্ক করে দিন
      if (selectedConversation?.twilioConversationSid === message.conversation.sid) {
        if (message.author !== currentUserId) {
          triggerMarkAsRead(message.conversation.sid, message.index);
        }
      }
    };

    twilioClient.on("conversationAdded", handleConversationAdded);
    twilioClient.on("messageAdded", handleMessageAdded);

    return () => {
      twilioClient.removeListener("conversationAdded", handleConversationAdded);
      twilioClient.removeListener("messageAdded", handleMessageAdded);
    };
  }, [twilioClient, selectedConversation, currentUserId]);

  // Outside click for Emoji Picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // ================= SEND MESSAGE =================
  const sendMessageMutation = useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (payload) => {
      return await sendMessage(payload);
    },
    onSuccess: async () => {
      setMessageText("");
      await refetchMessages();
      await refetchConversations();
    },
  });

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    setShowEmojiPicker(false);

    sendMessageMutation.mutate({
      conversationSid: selectedConversation?.twilioConversationSid,
      author: currentUserId,
      message: messageText.trim(),
    });
  };

  const handleEmojiClick = (emojiData) => {
    setMessageText((prev) => prev + emojiData.emoji);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelectGroupUser = (id) => {
    setSelectedGroupUsers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedGroupUsers.length === 0 || creatingConversation) return;

    createConversationMutate({
      friendlyName: groupName.trim(),
      participants: [currentUserId, ...selectedGroupUsers],
      isGroup: true,
      groupAdmin: currentUserId,
    });

    setShowGroupModal(false);
    setGroupName("");
    setSelectedGroupUsers([]);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u?.fullname?.toLowerCase()?.includes(searchText.toLowerCase())
    );
  }, [users, searchText]);

  const selectedConversationUser = selectedConversation?.participants?.find(
    (p) => String(p?._id || p) !== String(currentUserId)
  );

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className={styles.wrapper}>
      {/* LEFT SIDE */}
      <div className={styles.leftSide}>
        <div className={styles.topBar}>
          <div className={styles.searchBox}>
            <FiSearch />
            <input
              type="text"
              placeholder="Search User"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button className={styles.groupIconBtn} onClick={() => setShowGroupModal(true)}>
            <FiUsers />
          </button>
        </div>

        <div className={styles.chatList}>
          {/* GROUPS */}
          {conversations
            ?.filter((conv) => conv?.isGroup)
            ?.map((group) => (
              <div
                key={group._id}
                className={`${styles.chatItem} ${
                  selectedConversation?._id === group?._id ? styles.activeChat : ""
                }`}
                onClick={() => {
                  setSelectedConversation(group);
                  setSelectedUser(null);
                  triggerMarkAsRead(group.twilioConversationSid);
                }}
              >
                <div className={styles.groupAvatar}>{getInitial(group?.friendlyName)}</div>
                <div className={styles.chatInfo}>
                  <h4>{group?.friendlyName}</h4>
                  <p>{group?.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            ))}

          {/* USERS LIST */}
          {usersLoading ? (
            <p className={styles.infoText}>Loading...</p>
          ) : filteredUsers?.length > 0 ? (
            filteredUsers.map((u) => {
              const userImage = u?.image || u?.profileImage || "";
              const existingConversation = conversations.find(
                (conv) =>
                  !conv?.isGroup &&
                  conv?.participants?.some((p) => String(p?._id || p) === String(u._id))
              );
              const isActive = selectedConversation?._id === existingConversation?._id;
              const lastMsg = existingConversation?.lastMessage || u.email;

              return (
                <div
                  key={u._id}
                  className={`${styles.chatItem} ${isActive ? styles.activeChat : ""}`}
                  onClick={() => handleSelectUser(u)}
                >
                  {userImage ? (
                    <img src={userImage} alt="user" />
                  ) : (
                    <div className={styles.userAvatar}>{getInitial(u?.fullname)}</div>
                  )}
                  <div className={styles.chatInfo}>
                    <h4>{u.fullname}</h4>
                    <p>{lastMsg}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.infoText}>No users found</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.rightSide}>
        {selectedConversation ? (
          <>
            {/* HEADER */}
            <div className={styles.chatHeader}>
              <div className={styles.userInfo}>
                {!selectedConversation?.isGroup && selectedConversationUser?.image ? (
                  <img src={selectedConversationUser?.image} alt="user" />
                ) : (
                  <div className={styles.defaultAvatar}>
                    {getInitial(
                      selectedConversation?.isGroup
                        ? selectedConversation?.friendlyName
                        : selectedConversationUser?.fullname
                    )}
                  </div>
                )}
                <div>
                  <h3>
                    {selectedConversation?.isGroup
                      ? selectedConversation?.friendlyName
                      : selectedConversationUser?.fullname}
                  </h3>
                  <span>Online</span>
                </div>
              </div>

              <div className={styles.menuWrapper}>
                <button onClick={() => setShowMenu(!showMenu)}>
                  <FiMoreVertical />
                </button>
                {showMenu && (
                  <div className={styles.dropdownMenu}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        if (!selectedConversation?.twilioConversationSid) return;
                        deleteConversationMutation.mutate(
                          selectedConversation.twilioConversationSid
                        );
                        setShowMenu(false);
                      }}
                    >
                      Clear Chat
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* MESSAGES BODY */}
            <div className={styles.messageBody}>
              {allMessages?.map((msg, index) => {
                const isMine = msg?.author === currentUserId;
                const messageUser = selectedConversation?.participants?.find(
                  (p) => String(p?._id || p) === String(msg?.author)
                );

                // ✅ সঠিক 'আগের মেসেজ' ট্র্যাকিং (index - 1) কারণ লিস্টের শুরু ওল্ড মেসেজ দিয়ে হয়
                const prevMsg = index > 0 ? allMessages[index - 1] : null;
                const showAvatar = !prevMsg || prevMsg.author !== msg.author;
                
                const myImage = user?.image || user?.profileImage;
                const otherImage = messageUser?.image || messageUser?.profileImage;

                return (
                  <div
                    key={index}
                    className={`${styles.messageRow} ${isMine ? styles.myMessageRow : ""}`}
                  >
                    {!isMine && (
                      <div
                        className={`${styles.messageAvatarLeft} ${
                          !showAvatar ? styles.hiddenAvatar : ""
                        }`}
                      >
                        {showAvatar &&
                          (otherImage ? (
                            <img src={otherImage} alt="user" className={styles.avatarImage} />
                          ) : (
                            getInitial(messageUser?.fullname)
                          ))}
                      </div>
                    )}

                    <div className={styles.messageContent}>
                      {selectedConversation?.isGroup && showAvatar && (
                        <p className={`${styles.groupSenderName} ${isMine ? styles.mySenderName : ""}`}>
                          {isMine ? "You" : messageUser?.fullname}
                        </p>
                      )}
                      <div className={`${styles.messageBubble} ${isMine ? styles.myBubble : styles.otherBubble}`}>
                        {msg.body}
                      </div>
                    </div>

                    {isMine && (
                      <div
                        className={`${styles.messageAvatarRight} ${
                          !showAvatar ? styles.hiddenAvatar : ""
                        }`}
                      >
                        {showAvatar && (myImage ? (
                          <img src={myImage} alt="me" className={styles.avatarImage} />
                        ) : (
                          getInitial(user?.fullname)
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            {/* INPUT BOX */}
            <div className={styles.messageInputBox}>
              <div className={styles.emojiWrapper} ref={emojiPickerRef}>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={styles.emojiBtn}
                >
                  <FiSmile />
                </button>
                {showEmojiPicker && (
                  <div className={styles.emojiPicker}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} skinTonesDisabled={true} />
                  </div>
                )}
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={isListening ? `${messageText} ${interimTranscript || ""}` : messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              {/* VOICE CONTROLS */}
              {!isListening ? (
                <button className={styles.voiceBtn} onClick={startVoiceTyping}>
                  <BsMicFill />
                </button>
              ) : (
                <div className={styles.voiceControls}>
                  <div className={styles.voiceWave}>
                    <span></span><span></span><span></span>
                  </div>
                  <button className={styles.deleteVoiceBtn} onClick={deleteVoiceTyping}>
                    <BsTrashFill />
                  </button>
                  <button className={styles.pauseVoiceBtn} onClick={pauseVoiceTyping}>
                    <BsPauseFill />
                  </button>
                </div>
              )}

              <button className={styles.sendMsg} onClick={handleSendMessage}>
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyChat}>
            <div className={styles.emptyContent}>
              <h2>Select Conversation</h2>
              <p>Choose a user from the left sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* GROUP MODAL */}
      {showGroupModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Create Group</h3>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={styles.groupInput}
            />
            <div className={styles.groupUsers}>
              {users.map((u) => (
                <div key={u._id} className={styles.groupUser} onClick={() => handleSelectGroupUser(u._id)}>
                  <input type="checkbox" checked={selectedGroupUsers.includes(u._id)} readOnly />
                  <span>{u.fullname}</span>
                </div>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setShowGroupModal(false)}>Cancel</button>
              <button onClick={handleCreateGroup} disabled={creatingConversation}>
                {creatingConversation ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}