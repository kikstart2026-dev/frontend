
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
  markAsRead
} from "../../apis/api";

import styles from "./Messages.module.scss";
import {
  FiMoreVertical,
  FiSearch,
  FiSend,
  FiSmile,
  FiUsers,
} from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { BsMicFill, BsPauseFill, BsTrashFill } from "react-icons/bs";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});

  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // ================= VOICE TYPING =================
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

  // Voice Transcript Auto Append (Fixed Duplicate Logic)
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

  // ================= TWILIO TOKEN & CLIENT INITIALIZATION =================
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
        console.log("Twilio Client connected successfully!");
      } catch (error) {
        console.log("Twilio client error:", error);
      }
    },
  });

  // 🔥 CRITICAL FIX: Trigger token mutation on component mount
  useEffect(() => {
    if (currentUserId) {
      tokenMutation.mutate();
    }
  }, [currentUserId]);

  // ================= FETCH USERS & CONVERSATIONS =================
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

  // ================= CONVERSATION MUTATIONS =================
  const { mutate: createConversationMutate, isPending: creatingConversation } =
    useMutation({
      mutationFn: async (payload) => {
        const res = await createConversation(payload);
        return res?.data || res;
      },
      onSuccess: async (data) => {
        const newConversation = data?.conversation;
        if (newConversation) {
          setSelectedConversation(newConversation);
        }
        await refetchConversations();
        queryClient.invalidateQueries({
          queryKey: ["user-conversations", currentUserId],
        });
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
      queryClient.invalidateQueries({
        queryKey: ["user-conversations", currentUserId],
      });
    },
    onError: (error) => {
      console.log("Delete Error:", error);
    },
  });

  // ================= UNREAD MESSAGE MARK AS READ =================
  const markConversationRead = async (sid) => {
    if (!sid) return;
    try {
      let lastIndex = 0;

      // 1. Twilio SDK update (Get current accurate index)
      if (twilioClient) {
        const conversation = await twilioClient.getConversationBySid(sid);
        lastIndex = await conversation.setAllMessagesRead();
      }

      // 2. Backend update with standard read-index logic
      await markAsRead({
        conversationSid: sid,
        identity: currentUserId,
        lastReadMessageIndex: lastIndex ?? null
      });

      // 3. UI instant reset
      setUnreadCounts((prev) => ({
        ...prev,
        [sid]: 0,
      }));
    } catch (err) {
      console.log("Mark read error:", err);
    }
  };

  const handleSelectUser = async (selectedUserData) => {
    const existingConversation = conversations.find(
      (conv) =>
        !conv?.isGroup &&
        conv?.participants?.some(
          (p) => String(p?._id || p) === String(selectedUserData._id),
        ),
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
      setSelectedUser(selectedUserData);
      await markConversationRead(existingConversation.twilioConversationSid);
      return;
    }

    createConversationMutate({
      friendlyName: selectedUserData.fullname,
      participants: [currentUserId, selectedUserData._id],
      isGroup: false,
    });
    setSelectedUser(selectedUserData);
  };

  // ================= FETCH & REALTIME MESSAGES =================
  const { data: messageData, refetch: refetchMessages } = useQuery({
    queryKey: [
      "conversation-messages",
      selectedConversation?.twilioConversationSid,
    ],
    queryFn: async () => {
      const res = await getMessages(selectedConversation?.twilioConversationSid);
      return res?.data || res;
    },
    enabled: !!selectedConversation?.twilioConversationSid,
  });

  useEffect(() => {
    if (messageData?.messages) {
      setAllMessages(messageData.messages);
    }
  }, [messageData]);

  // Realtime Listeners & Sync Unread Counts
  useEffect(() => {
    if (!twilioClient) return;

    const refreshUnreadCounts = async () => {
      try {
        const counts = {};
        const paginator = await twilioClient.getSubscribedConversations();
        for (const item of paginator.items) {
          const count = await item.getUnreadMessagesCount();
          counts[item.sid] = count || 0;
        }
        setUnreadCounts(counts);
      } catch (err) {
        console.log("Error shifting unread counts:", err);
      }
    };

    const handleConversationAdded = async () => {
      await refetchConversations();
      queryClient.invalidateQueries({
        queryKey: ["user-conversations", currentUserId],
      });
      refreshUnreadCounts();
    };
    const handleMessageAdded = async (message) => {
      // 💡 যদি নতুন মেসেজটি বর্তমানে সিলেক্ট করা চ্যাটেরই অংশ হয়
      if (selectedConversation && message.conversation.sid === selectedConversation.twilioConversationSid) {
        // সরাসরি ক্লায়েন্ট লেভেলে রিড মার্ক করে দিন, যাতে কাউন্ট ২ বা ৫০ এ আটকে না থাকে
        await message.conversation.setAllMessagesRead();

        // ব্যাকএন্ডকেও সিঙ্ক করে দিন (Optional কিন্তু সেফ)
        markAsRead({
          conversationSid: message.conversation.sid,
          identity: currentUserId,
          lastReadMessageIndex: message.index
        });

        setUnreadCounts(prev => ({ ...prev, [message.conversation.sid]: 0 }));
      }

      // কারেন্ট চ্যাট না হলে নরমাল রিফ্রেশ হবে
      await refetchMessages();
      refreshUnreadCounts();
    };

    twilioClient.on("conversationAdded", handleConversationAdded);
    twilioClient.on("messageAdded", handleMessageAdded);

    // Initial load
    refreshUnreadCounts();

    return () => {
      twilioClient.removeListener("conversationAdded", handleConversationAdded);
      twilioClient.removeListener("messageAdded", handleMessageAdded);
    };
  }, [twilioClient, currentUserId, refetchConversations, refetchMessages, queryClient]);

  // Handle Initial Count Load on conversation list change
  useEffect(() => {
    if (!twilioClient) return;
    const loadUnreadCounts = async () => {
      try {
        const counts = {};
        const paginator = await twilioClient.getSubscribedConversations();
        for (const item of paginator.items) {
          const count = await item.getUnreadMessagesCount();
          counts[item.sid] = count || 0;
        }
        setUnreadCounts(counts);
      } catch (err) {
        console.log("Unread Count Error:", err);
      }
    };
    loadUnreadCounts();
  }, [twilioClient, conversations]);

  // ================= UI INTERACTION HANDLERS =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const sendMessageMutation = useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (payload) => {
      return await sendMessage(payload);
    },
    onSuccess: async () => {
      setMessageText("");
      await refetchMessages();
      queryClient.invalidateQueries({
        queryKey: ["user-conversations", currentUserId],
      });
    },
  });

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
    if (!groupName.trim() || selectedGroupUsers.length === 0) return;
    if (creatingConversation) return;

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

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    setShowEmojiPicker(false);

    sendMessageMutation.mutate({
      conversationSid: selectedConversation?.twilioConversationSid,
      author: currentUserId,
      message: messageText,
    });
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
      {/* LEFT SIDE: SIDEBAR */}
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
          <button
            className={styles.groupIconBtn}
            onClick={() => setShowGroupModal(true)}
          >
            <FiUsers />
          </button>
        </div>

        <div className={styles.chatList}>
          {/* GROUP LIST */}
          {conversations
            ?.filter((conv) => conv?.isGroup)
            ?.map((group) => (
              <div
                key={group._id}
                className={`${styles.chatItem} ${selectedConversation?._id === group?._id ? styles.activeChat : ""
                  }`}
                onClick={() => {
                  setSelectedConversation(group);
                  setSelectedUser(null);
                  markConversationRead(group.twilioConversationSid);
                }}
              >
                <div className={styles.groupAvatar}>
                  {getInitial(group?.friendlyName)}
                </div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatHeaderRow}>
                    <h4>{group?.friendlyName}</h4>
                    {unreadCounts[group?.twilioConversationSid] > 0 && (
                      <span className={styles.unreadBadge}>
                        {unreadCounts[group?.twilioConversationSid]}
                      </span>
                    )}
                  </div>
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
                  conv?.participants?.some(
                    (p) => String(p?._id || p) === String(u._id)
                  )
              );
              const isActive = selectedConversation?._id === existingConversation?._id;
              const lastMsg = existingConversation?.lastMessage || u.email;
              const convSid = existingConversation?.twilioConversationSid;

              return (
                <div
                  key={u._id}
                  className={`${styles.chatItem} ${isActive ? styles.activeChat : ""}`}
                  onClick={() => handleSelectUser(u)}
                >
                  {userImage ? (
                    <img src={userImage} alt="user" />
                  ) : (
                    <div className={styles.userAvatar}>
                      {getInitial(u?.fullname)}
                    </div>
                  )}
                  <div className={styles.chatInfo}>
                    <div className={styles.chatHeaderRow}>
                      <h4>{u.fullname}</h4>
                      {convSid && unreadCounts[convSid] > 0 && (
                        <span className={styles.unreadBadge}>
                          {unreadCounts[convSid]}
                        </span>
                      )}
                    </div>
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

      {/* RIGHT SIDE: CHAT WINDOW */}
      <div className={styles.rightSide}>
        {selectedConversation ? (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.userInfo}>
                {!selectedConversation?.isGroup && selectedConversationUser?.image ? (
                  <img src={selectedConversationUser?.image} alt="user" />
                ) : (
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      background: "#ff4d4f",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
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
                const prevMsg = allMessages[index + 1];
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
                        className={`${styles.messageAvatarLeft} ${!showAvatar ? styles.hiddenAvatar : ""
                          }`}
                      >
                        {showAvatar &&
                          (otherImage ? (
                            <img
                              src={otherImage}
                              alt="user"
                              className={styles.avatarImage}
                            />
                          ) : (
                            getInitial(messageUser?.fullname)
                          ))}
                      </div>
                    )}

                    <div className={styles.messageContent}>
                      {selectedConversation?.isGroup && showAvatar && (
                        <p
                          className={`${styles.groupSenderName} ${isMine ? styles.mySenderName : ""
                            }`}
                        >
                          {isMine ? "You" : messageUser?.fullname}
                        </p>
                      )}
                      <div
                        className={`${styles.messageBubble} ${isMine ? styles.myBubble : styles.otherBubble
                          }`}
                      >
                        {msg.body}
                      </div>
                    </div>

                    {isMine && (
                      <div
                        className={`${styles.messageAvatarRight} ${!showAvatar ? styles.hiddenAvatar : ""
                          }`}
                      >
                        {myImage ? (
                          <img src={myImage} alt="me" className={styles.avatarImage} />
                        ) : (
                          getInitial(user?.fullname)
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            {/* MESSAGE INPUT BOX */}
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
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      skinTonesDisabled={true}
                    />
                  </div>
                )}
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={
                  isListening
                    ? `${messageText} ${interimTranscript || ""}`
                    : messageText
                }
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
                    <span></span>
                    <span></span>
                    <span></span>
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
                <div
                  key={u._id}
                  className={styles.groupUser}
                  onClick={() => handleSelectGroupUser(u._id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedGroupUsers.includes(u._id)}
                    readOnly
                  />
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
