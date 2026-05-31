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
  markMessagesAsSeen,
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

  // const [twilioConversations, setTwilioConversations] = useState([]);

  const messageEndRef = useRef(null);

  const inputRef = useRef(null);

  const emojiPickerRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [showGroupModal, setShowGroupModal] = useState(false);

  const [groupName, setGroupName] = useState("");

  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  //<.....green dot.......>
  const hasUnreadMessages = (conversation) => {
    if (!conversation?.messages) return false;

    return conversation.messages.some((msg) => {
      if (msg.author === currentUserId) return false;

      let attrs = {};

      try {
        attrs =
          typeof msg.attributes === "string"
            ? JSON.parse(msg.attributes)
            : msg.attributes || {};
      } catch {
        attrs = {};
      }

      const seenBy = attrs.seenBy || [];

      return !seenBy.includes(currentUserId);
    });
  };

  useEffect(() => {
    if (!selectedConversation?.twilioConversationSid || !currentUserId) return;

    const updateSeen = async () => {
      try {
        await markMessagesAsSeen({
          conversationSid: selectedConversation.twilioConversationSid,
          userId: currentUserId,
        });

        await refetchMessages();
        await refetchConversations();
      } catch (err) {
        console.log(err);
      }
    };

    updateSeen();
  }, [selectedConversation?._id]);

  // ================= VOICE =================
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  /* ================= LANGUAGE DETECT ================= */

  const detectLanguage = (text) => {
    // Bengali
    const bengaliRegex = /[\u0980-\u09FF]/;

    // Hindi
    const hindiRegex = /[\u0900-\u097F]/;

    if (bengaliRegex.test(text)) {
      return "bn";
    }

    if (hindiRegex.test(text)) {
      return "hi";
    }

    return "en";
  };

  /* ================= START LISTENING ================= */

  const startVoiceTyping = async () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support voice typing");
      return;
    }

    setIsListening(true);

    await SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,

      // BEST mixed support
      language: "en-IN",
    });
  };

  /* ================= STOP ================= */

  const pauseVoiceTyping = () => {
    setIsListening(false);

    SpeechRecognition.stopListening();
  };

  /* ================= DELETE ================= */

  const deleteVoiceTyping = () => {
    setIsListening(false);

    SpeechRecognition.stopListening();

    resetTranscript();

    setMessageText("");
  };

  /* ================= AUTO APPEND ================= */

  useEffect(() => {
    if (!finalTranscript) return;

    const detected = detectLanguage(finalTranscript);

    console.log("Detected Language:", detected);

    setMessageText((prev) => {
      if (prev.includes(finalTranscript)) {
        return prev;
      }

      return prev ? `${prev} ${finalTranscript}` : finalTranscript;
    });

    resetTranscript();
  }, [finalTranscript, resetTranscript]);

  /* ================= AUTO STOP WHEN MIC OFF ================= */

  useEffect(() => {
    if (!isListening) {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  /* ================= TOKEN ================= */
  const tokenMutation = useMutation({
    mutationKey: ["generate-token"],

    mutationFn: async () => {
      return await generateToken({
        identity: currentUserId,
      });
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

  useEffect(() => {
    if (finalTranscript) {
      const detectedLang = detectLanguage(finalTranscript);

      console.log("Detected:", detectedLang);

      setMessageText((prev) => {
        if (prev.includes(finalTranscript)) {
          return prev;
        }

        return prev ? `${prev} ${finalTranscript}` : finalTranscript;
      });

      resetTranscript();
    }
  }, [finalTranscript]);

  /* ================= USERS ================= */
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

    // নিজের user remove
    return allUsers.filter((u) => String(u._id) !== String(currentUserId));
  }, [usersData, currentUserId]);

  /* ================= CONVERSATIONS ================= */
  const { data: conversationData, refetch: refetchConversations } = useQuery({
    queryKey: ["user-conversations", currentUserId],

    queryFn: async () => {
      const res = await getUserConversations(currentUserId);

      return res?.data || res;
    },

    enabled: !!currentUserId,
  });
  const conversations = conversationData?.conversations || [];

  /* ================= CREATE CONVERSATION ================= */
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

        // refresh sidebar
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
      // clear current screen
      setSelectedConversation(null);

      setAllMessages([]);

      // refresh sidebar
      await refetchConversations();

      queryClient.invalidateQueries({
        queryKey: ["user-conversations", currentUserId],
      });
    },

    onError: (error) => {
      console.log("Delete Error:", error);
    },
  });

  /* ================= SELECT USER ================= */
  const handleSelectUser = async (selectedUserData) => {
    // Existing conversation check
    const existingConversation = conversations.find(
      (conv) =>
        !conv?.isGroup &&
        conv?.participants?.some(
          (p) => String(p?._id || p) === String(selectedUserData._id),
        ),
    );

    // ✅ existing
    if (existingConversation) {
      setSelectedConversation(existingConversation);

      setSelectedUser(selectedUserData);

      return;
    }

    // ✅ create new
    createConversationMutate({
      friendlyName: selectedUserData.fullname,

      participants: [currentUserId, selectedUserData._id],

      isGroup: false,
    });

    setSelectedUser(selectedUserData);
  };

  /* ================= MESSAGES ================= */
  const { data: messageData, refetch: refetchMessages } = useQuery({
    queryKey: [
      "conversation-messages",
      selectedConversation?.twilioConversationSid,
    ],

    queryFn: async () => {
      const res = await getMessages(
        selectedConversation?.twilioConversationSid,
      );

      return res?.data || res;
    },

    enabled: !!selectedConversation?.twilioConversationSid,
  });

  useEffect(() => {
    if (messageData?.messages) {
      setAllMessages(messageData.messages);
    }
  }, [messageData]);

  /* ================= REALTIME ================= */
  useEffect(() => {
    if (!twilioClient) return;

    const handleConversationAdded = async () => {
      await refetchConversations();

      queryClient.invalidateQueries({
        queryKey: ["user-conversations", currentUserId],
      });
    };

    const handleMessageAdded = async () => {
      // refresh current opened chat
      await refetchMessages();

      // refresh sidebar last message
      await refetchConversations();

      queryClient.invalidateQueries({
        queryKey: ["user-conversations", currentUserId],
      });
    };

    twilioClient.on("conversationAdded", handleConversationAdded);

    twilioClient.on("messageAdded", handleMessageAdded);

    return () => {
      twilioClient.removeListener("conversationAdded", handleConversationAdded);

      twilioClient.removeListener("messageAdded", handleMessageAdded);
    };
  }, [
    twilioClient,
    currentUserId,
    refetchConversations,
    refetchMessages,
    queryClient,
  ]);

  //last message show -------------------------------------------
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= SCROLL ================= */
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allMessages]);

  /* ================= SEND MESSAGE ================= */
  const sendMessageMutation = useMutation({
    mutationKey: ["send-message"],

    mutationFn: async (payload) => {
      return await sendMessage(payload);
    },

    onSuccess: async () => {
      setMessageText("");

      // refresh current chat
      await refetchMessages();

      // refresh sidebar last message
      await refetchConversations();

      // optional extra safe refresh
      queryClient.invalidateQueries({
        queryKey: ["user-conversations", currentUserId],
      });
    },
  });

  const handleEmojiClick = (emojiData) => {
    setMessageText((prev) => prev + emojiData.emoji);

    // focus back to input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelectGroupUser = (id) => {
    setSelectedGroupUsers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedGroupUsers.length === 0) {
      return;
    }

    // prevent duplicate click
    if (creatingConversation) return;

    createConversationMutate({
      friendlyName: groupName.trim(),

      participants: [currentUserId, ...selectedGroupUsers],

      isGroup: true,

      groupAdmin: currentUserId,
    });

    // close modal
    setShowGroupModal(false);

    // reset fields
    setGroupName("");

    setSelectedGroupUsers([]);
  };
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    // close emoji picker
    setShowEmojiPicker(false);

    sendMessageMutation.mutate({
      conversationSid: selectedConversation?.twilioConversationSid,

      author: currentUserId,

      message: messageText,
    });
  };

  /* ================= FILTER USERS ================= */
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u?.fullname?.toLowerCase()?.includes(searchText.toLowerCase()),
    );
  }, [users, searchText]);

  /* ================= GET INITIAL ================= */
  const selectedConversationUser = selectedConversation?.participants?.find(
    (p) => String(p?._id || p) !== String(currentUserId),
  );

  /* ================= GET INITIAL ================= */
  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className={styles.wrapper}>
      {/* LEFT SIDE */}
      <div className={styles.leftSide}>
        {/* SEARCH BOX */}
        <div className={styles.topBar}>
          {/* SEARCH BOX */}
          <div className={styles.searchBox}>
            <FiSearch />

            <input
              type="text"
              placeholder="Search User"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* CREATE GROUP ICON */}
          <button
            className={styles.groupIconBtn}
            onClick={() => setShowGroupModal(true)}
          >
            <FiUsers />
          </button>
        </div>

        {/* CHAT LIST */}
        <div className={styles.chatList}>
          {/* ================= CONVERSATIONS (GROUP + CHAT) ================= */}
          {conversations
            ?.filter((conv) => conv?.isGroup)
            ?.map((group) => (
              <div
                key={group._id}
                className={`${styles.chatItem} ${
                  selectedConversation?._id === group?._id
                    ? styles.activeChat
                    : ""
                }`}
                onClick={() => {
                  setSelectedConversation(group);
                  setSelectedUser(null);
                }}
              >
                <div className={styles.groupAvatar}>
                  {getInitial(group?.friendlyName)}
                </div>

                <div className={styles.chatInfo}>
                  <div className={styles.chatHeaderRow}>
                    <h4>{group?.friendlyName}</h4>

                    {hasUnreadMessages(group) && (
                      <div className={styles.unreadDot}></div>
                    )}
                  </div>

                  <p>{group?.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            ))}

          {/* ================= USERS LIST ================= */}
          {usersLoading ? (
            <p className={styles.infoText}>Loading...</p>
          ) : filteredUsers?.length > 0 ? (
            filteredUsers.map((u) => {
              const userImage = u?.image || u?.profileImage || "";

              const existingConversation = conversations.find(
                (conv) =>
                  !conv?.isGroup &&
                  conv?.participants?.some(
                    (p) => String(p?._id || p) === String(u._id),
                  ),
              );
              const isActive =
                selectedConversation?._id === existingConversation?._id;

              const lastMsg = existingConversation?.lastMessage || u.email;

              return (
                <div
                  key={u._id}
                  className={`${styles.chatItem} ${
                    isActive ? styles.activeChat : ""
                  }`}
                  onClick={() => handleSelectUser(u)}
                >
                  {/* USER IMAGE / LETTER */}
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

                      {existingConversation &&
                        hasUnreadMessages(existingConversation) && (
                          <div className={styles.unreadDot}></div>
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

      {/* RIGHT SIDE */}
      <div className={styles.rightSide}>
        {selectedConversation ? (
          <>
            {/* HEADER */}
            <div className={styles.chatHeader}>
              <div className={styles.userInfo}>
                {!selectedConversation?.isGroup &&
                selectedConversationUser?.image ? (
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
                        : selectedConversationUser?.fullname,
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
                        if (!selectedConversation?.twilioConversationSid)
                          return;

                        deleteConversationMutation.mutate(
                          selectedConversation.twilioConversationSid,
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

            {/* MESSAGES */}
            <div className={styles.messageBody}>
              {allMessages?.map((msg, index) => {
                const isMine = msg?.author === currentUserId;
                const messageUser = selectedConversation?.participants?.find(
                  (p) => String(p?._id || p) === String(msg?.author),
                );

                const prevMsg = allMessages[index - 1];

                const showAvatar = !prevMsg || prevMsg.author !== msg.author;
                const myImage = user?.image || user?.profileImage;

                const otherImage =
                  messageUser?.image || messageUser?.profileImage;

                return (
                  <div
                    key={index}
                    className={`${styles.messageRow} ${
  isMine ? styles.myMessageRow : styles.otherMessageRow
}`}
                  >
                    {!isMine && (
                      <div
                        className={`${styles.messageAvatarLeft} ${
                          !showAvatar ? styles.hiddenAvatar : ""
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
                          className={`${styles.groupSenderName}
                ${isMine ? styles.mySenderName : ""}`}
                        >
                          {isMine ? "You" : messageUser?.fullname}
                        </p>
                      )}

                      <div
                        className={`${styles.messageBubble}
        ${isMine ? styles.myBubble : styles.otherBubble}`}
                      >
                        {msg.body}
                      </div>
                      {isMine && (
                        <div className={styles.messageStatus}>
                          {(() => {
                            let attrs = {};

                            try {
                              attrs =
                                typeof msg.attributes === "string"
                                  ? JSON.parse(msg.attributes)
                                  : msg.attributes || {};
                            } catch {
                              attrs = {};
                            }

                            const seenBy = attrs.seenBy || [];

                            // current user ছাড়া অন্য কেউ seen করলে
                            const isSeen = seenBy.some(
                              (id) => String(id) !== String(currentUserId),
                            );

                            return (
                              <span
                                className={
                                  isSeen ? styles.seenTick : styles.sentTick
                                }
                              >
                                ✓✓
                              </span>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    {isMine && (
                      <div
                        className={`${styles.messageAvatarRight} ${
                          !showAvatar ? styles.hiddenAvatar : ""
                        }`}
                      >
                        {myImage ? (
                          <img
                            src={myImage}
                            alt="me"
                            className={styles.avatarImage}
                          />
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

            {/* INPUT */}
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
                onInput={(e) => {
                  e.target.scrollLeft = e.target.scrollWidth;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              {/* ================= VOICE BUTTONS ================= */}

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

                  <button
                    className={styles.deleteVoiceBtn}
                    onClick={deleteVoiceTyping}
                  >
                    <BsTrashFill />
                  </button>

                  <button
                    className={styles.pauseVoiceBtn}
                    onClick={pauseVoiceTyping}
                  >
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

              <button
                onClick={handleCreateGroup}
                disabled={creatingConversation}
              >
                {creatingConversation ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
