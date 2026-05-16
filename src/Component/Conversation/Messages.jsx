import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";


import { Client } from "@twilio/conversations";

import {
    generateToken,
    getMessages,
    getUserConversations,
    sendMessage,
    getChatUsers,
    createConversation,
    deleteConversation
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

export default function Messages() {

    const queryClient = useQueryClient();
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const currentUserId =
        user?._id || user?.id;

    const [selectedConversation, setSelectedConversation] =
        useState(null);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [messageText, setMessageText] =
        useState("");

    const [allMessages, setAllMessages] =
        useState([]);

    const [searchText, setSearchText] =
        useState("");

    const [twilioClient, setTwilioClient] =
        useState(null);

    // const [twilioConversations, setTwilioConversations] = useState([]);

    const messageEndRef = useRef(null);



    const [showEmojiPicker, setShowEmojiPicker] =
        useState(false);

    const [showGroupModal, setShowGroupModal] =
        useState(false);

    const [groupName, setGroupName] =
        useState("");

    const [selectedGroupUsers, setSelectedGroupUsers] =
        useState([]);

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
                const token =
                    data?.token ||
                    data?.data?.token;

                if (!token) return;

                const client =
                    await Client.create(
                        token
                    );

                setTwilioClient(client);
            } catch (error) {
                console.log(
                    "Twilio client error:",
                    error
                );
            }
        },
    });

    useEffect(() => {
        if (currentUserId) {
            tokenMutation.mutate();
        }
    }, [currentUserId]);

    /* ================= USERS ================= */
    const {
        data: usersData,
        isLoading: usersLoading,
    } = useQuery({
        queryKey: ["chat-users"],

        queryFn: async () => {
            const res =
                await getChatUsers();

            return (
                res?.data || res
            );
        },

        enabled: !!currentUserId,
    });

    const users = useMemo(() => {
        const allUsers =
            usersData?.users || [];

        // নিজের user remove
        return allUsers.filter(
            (u) =>
                String(u._id) !== String(currentUserId)
        );
    }, [
        usersData,
        currentUserId,
    ]);


    /* ================= CONVERSATIONS ================= */
    const {
        data: conversationData,
        refetch: refetchConversations,
    } = useQuery({
        queryKey: [
            "user-conversations",
            currentUserId,
        ],

        queryFn: async () => {
            const res =
                await getUserConversations(
                    currentUserId
                );

            return (
                res?.data || res
            );
        },

        enabled: !!currentUserId,
    });
    const conversations =
        conversationData?.conversations ||
        [];

    /* ================= CREATE CONVERSATION ================= */
    const createConversationMutation =
        useMutation({
            mutationFn:
                async (payload) => {
                    const res =
                        await createConversation(
                            payload
                        );

                    return (
                        res?.data || res
                    );
                },

            onSuccess: async (data) => {
                const newConversation = data?.conversation;

                setSelectedConversation(newConversation);

                // 🔥 IMPORTANT FIX: force query update
                await refetchConversations();

                // optional but better (ensures UI refresh)
                queryClient.invalidateQueries({
                    queryKey: ["user-conversations", currentUserId],
                });
            },
        });


    const deleteConversationMutation = useMutation({
        mutationFn: async (conversationSid) => {
            return await deleteConversation(conversationSid);
        },

        onSuccess: () => {
            // sidebar refresh
            queryClient.invalidateQueries({
                queryKey: ["user-conversations", currentUserId],
            });

            // if deleted chat was open
            setSelectedConversation(null);
            setAllMessages([]);
        },
    });

    /* ================= SELECT USER ================= */
    const handleSelectUser = async (
        selectedUserData
    ) => {

        // Existing conversation check
        const existingConversation =
            conversations.find(
                (conv) =>
                    !conv?.isGroup &&
                    conv?.participants?.some(
                        (p) =>
                            String(p?._id || p) ===
                            String(selectedUserData._id)
                    )
            );

        // ✅ existing
        if (existingConversation) {

            setSelectedConversation(
                existingConversation
            );

            setSelectedUser(
                selectedUserData
            );

            return;
        }

        // ✅ create new
        createConversationMutation.mutate(
            {
                friendlyName:
                    selectedUserData.fullname,

                participants: [
                    currentUserId,
                    selectedUserData._id,
                ],

                isGroup: false,
            },
            {
                onSuccess: (data) => {

                    const newConversation =
                        data?.conversation;

                    setSelectedConversation(
                        newConversation
                    );

                    setSelectedUser(
                        selectedUserData
                    );
                },
            }
        );
    };

    /* ================= MESSAGES ================= */
    const {
        data: messageData,
        refetch: refetchMessages,
    } = useQuery({
        queryKey: [
            "conversation-messages",
            selectedConversation?.twilioConversationSid,
        ],

        queryFn: async () => {
            const res =
                await getMessages(
                    selectedConversation?.twilioConversationSid
                );

            return (
                res?.data || res
            );
        },

        enabled:
            !!selectedConversation?.twilioConversationSid,
    });

    useEffect(() => {
        if (messageData?.messages) {
            setAllMessages(
                messageData.messages
            );
        }
    }, [messageData]);

    /* ================= REALTIME ================= */
    useEffect(() => {
        if (!twilioClient) return;

        const handleNewMessage = (message) => {
            const convoSid = message?.conversation?.sid;

            if (
                convoSid !==
                selectedConversation?.twilioConversationSid
            ) {
                return;
            }

            setAllMessages((prev) => [...prev, message]);
        };

        twilioClient.on("messageAdded", handleNewMessage);

        return () => {
            twilioClient.removeListener(
                "messageAdded",
                handleNewMessage
            );
        };
    }, [twilioClient, selectedConversation]);

    //last message show -------------------------------------------


    /* ================= SCROLL ================= */
    useEffect(() => {
        messageEndRef.current?.scrollIntoView(
            {
                behavior: "smooth",
            }
        );
    }, [allMessages]);

    /* ================= SEND MESSAGE ================= */
    const sendMessageMutation =
        useMutation({
            mutationKey: [
                "send-message",
            ],

            mutationFn: async (
                payload
            ) => {
                return await sendMessage(
                    payload
                );
            },

            onSuccess: async () => {

                setMessageText("");

                // refresh current chat
                await refetchMessages();

                // refresh sidebar last message
                await refetchConversations();

                // optional extra safe refresh
                queryClient.invalidateQueries({
                    queryKey: [
                        "user-conversations",
                        currentUserId,
                    ],
                });
            },
        });


    const handleEmojiClick = (emojiData) => {
        setMessageText(
            (prev) => prev + emojiData.emoji
        );
    };

    const handleSelectGroupUser = (id) => {
        setSelectedGroupUsers((prev) => {
            if (prev.includes(id)) {
                return prev.filter(
                    (item) => item !== id
                );
            }

            return [...prev, id];
        });
    };




    const handleCreateGroup = () => {
        if (!groupName || selectedGroupUsers.length === 0) {
            return;
        }

        createConversationMutation.mutate(
            {
                friendlyName: groupName,
                participants: [currentUserId, ...selectedGroupUsers],
                isGroup: true,
                groupAdmin: currentUserId,
            },
            {
                onSuccess: (data) => {
                    const newConversation =
                        data?.conversation ||
                        data?.data?.conversation;

                    if (newConversation) {
                        setSelectedConversation(newConversation);
                    }

                    setShowGroupModal(false);
                    setGroupName("");
                    setSelectedGroupUsers([]);

                    // 🔥 IMPORTANT FIX (sidebar refresh)
                    queryClient.invalidateQueries([
                        "user-conversations",
                    ]);
                },
            }
        );
    };
    const handleSendMessage = () => {
        if (
            !messageText.trim() ||
            !selectedConversation
        )
            return;

        sendMessageMutation.mutate({
            conversationSid:
                selectedConversation?.twilioConversationSid,

            author: currentUserId,

            message: messageText,
        });
    };

    /* ================= FILTER USERS ================= */
    const filteredUsers = useMemo(() => {
        return users.filter((u) =>
            u?.fullname
                ?.toLowerCase()
                ?.includes(
                    searchText.toLowerCase()
                )
        );
    }, [users, searchText]);

    /* ================= GET INITIAL ================= */
    const selectedConversationUser =
        selectedConversation?.participants?.find(
            (p) =>
                String(p?._id || p) !==
                String(currentUserId)
        );

    /* ================= GET INITIAL ================= */
    const getInitial = (
        name
    ) => {
        return (
            name
                ?.charAt(0)
                ?.toUpperCase() || "U"
        );
    };

    return (
        <div className={styles.wrapper}>
            {/* LEFT SIDE */}
            <div className={styles.leftSide}>
                {/* SEARCH BOX */}
                <div className={styles.searchBox}>
                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search User"
                        value={searchText}
                        onChange={(e) =>
                            setSearchText(e.target.value)
                        }
                    />
                </div>

                {/* CREATE GROUP BUTTON */}
                <button
                    className={styles.groupBtn}
                    onClick={() => setShowGroupModal(true)}
                >
                    <FiUsers />
                    Create Group
                </button>

                {/* CHAT LIST */}
                <div className={styles.chatList}>
                    {/* ================= CONVERSATIONS (GROUP + CHAT) ================= */}
                    {conversations
                        ?.filter((conv) => conv?.isGroup)
                        ?.map((group) => (
                            <div
                                key={group._id}
                                className={styles.chatItem}
                                onClick={() => {
                                    setSelectedConversation(group);
                                    setSelectedUser(null);
                                }}
                            >
                                <div
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "50%",
                                        background: "#1890ff",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "700",
                                        fontSize: "18px",
                                    }}
                                >
                                    {getInitial(group?.friendlyName)}
                                </div>

                                <div className={styles.chatInfo}>
                                    <h4>
                                        {group?.friendlyName}
                                    </h4>

                                    <p>
                                        {group?.lastMessage ||
                                            "No messages yet"}
                                    </p>
                                </div>
                            </div>
                        ))}

                    {/* ================= USERS LIST ================= */}
                    {usersLoading ? (
                        <p style={{ padding: "10px" }}>
                            Loading...
                        </p>
                    ) : filteredUsers?.length > 0 ? (
                        filteredUsers.map((u) => {

                            const existingConversation =
                                conversations.find(
                                    (conv) =>
                                        !conv?.isGroup &&
                                        conv?.participants?.some(
                                            (p) =>
                                                String(p?._id || p) ===
                                                String(u._id)
                                        )
                                );

                            const lastMsg =
                                existingConversation?.lastMessage ||
                                u.email;

                            return (
                                <div
                                    key={u._id}
                                    className={styles.chatItem}
                                    onClick={() =>
                                        handleSelectUser(u)
                                    }
                                >
                                    {/* USER IMAGE / LETTER */}
                                    {u?.image ? (
                                        <img
                                            src={u.image}
                                            alt="user"
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "45px",
                                                height: "45px",
                                                borderRadius: "50%",
                                                background:
                                                    "#ff4d4f",
                                                color: "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent:
                                                    "center",
                                                fontWeight: "700",
                                                fontSize: "18px",
                                            }}
                                        >
                                            {getInitial(
                                                u?.fullname
                                            )}
                                        </div>
                                    )}

                                    <div
                                        className={styles.chatInfo}
                                    >
                                        <h4>{u.fullname}</h4>

                                        <p>{lastMsg}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ padding: "10px" }}>
                            No users found
                        </p>
                    )}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className={styles.rightSide}>
                {selectedConversation ? (
                    <>
                        {/* HEADER */}
                        <div
                            className={
                                styles.chatHeader
                            }
                        >
                            <div
                                className={
                                    styles.userInfo
                                }
                            >
                                {selectedConversationUser?.image ? (
                                    <img
                                        src={
                                            selectedConversationUser?.image
                                        }
                                        alt="user"
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width:
                                                "45px",
                                            height:
                                                "45px",
                                            borderRadius:
                                                "50%",
                                            background:
                                                "#ff4d4f",
                                            color:
                                                "#fff",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            fontWeight:
                                                "700",
                                            fontSize:
                                                "18px",
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
                                        {
                                            selectedConversation?.isGroup
                                                ? selectedConversation?.friendlyName
                                                : selectedConversationUser?.fullname
                                        }
                                    </h3>

                                    <span>
                                        Online
                                    </span>
                                </div>
                            </div>

                            <button>
                                <FiMoreVertical />
                            </button>
                        </div>

                        {/* MESSAGES */}
                        <div
                            className={
                                styles.messageBody
                            }
                        >
                            {allMessages?.map(
                                (
                                    msg,
                                    index
                                ) => {
                                    const isMine =
                                        msg?.author ===
                                        currentUserId;

                                    return (
                                        <div
                                            key={
                                                index
                                            }
                                            className={`${styles.messageRow
                                                } ${isMine
                                                    ? styles.myMessageRow
                                                    : ""
                                                }`}
                                        >
                                            {!isMine && (
                                                <div
                                                    style={{
                                                        width:
                                                            "35px",
                                                        height:
                                                            "35px",
                                                        borderRadius:
                                                            "50%",
                                                        background:
                                                            "#999",
                                                        color:
                                                            "#fff",
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    {getInitial(
                                                        selectedConversation?.isGroup
                                                            ? selectedConversation?.friendlyName
                                                            : selectedConversationUser?.fullname
                                                    )}
                                                </div>
                                            )}

                                            <div
                                                className={`${styles.messageBubble
                                                    } ${isMine
                                                        ? styles.myBubble
                                                        : styles.otherBubble
                                                    }`}
                                            >
                                                {
                                                    msg?.body
                                                }
                                            </div>
                                        </div>
                                    );
                                }
                            )}

                            <div
                                ref={
                                    messageEndRef
                                }
                            />
                        </div>

                        {/* INPUT */}
                        <div
                            className={
                                styles.messageInputBox
                            }
                        >

                            <div className={styles.emojiWrapper}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowEmojiPicker(
                                            !showEmojiPicker
                                        )
                                    }
                                    className={styles.emojiBtn}
                                >
                                    <FiSmile />
                                </button>

                                {showEmojiPicker && (
                                    <div
                                        className={
                                            styles.emojiPicker
                                        }
                                    >
                                        <EmojiPicker
                                            onEmojiClick={handleEmojiClick}
                                            skinTonesDisabled={true}
                                        />
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={
                                    messageText
                                }
                                onChange={(e) =>
                                    setMessageText(
                                        e.target
                                            .value
                                    )
                                }
                                onKeyDown={(
                                    e
                                ) => {
                                    if (
                                        e.key ===
                                        "Enter"
                                    ) {
                                        handleSendMessage();
                                    }
                                }}
                            />

                            <button
                                className={
                                    styles.sendMsg
                                }
                                onClick={
                                    handleSendMessage
                                }
                            >
                                <FiSend />
                            </button>
                        </div>
                    </>
                ) : (
                    <div
                        className={
                            styles.emptyChat
                        }
                    >
                        <div
                            className={
                                styles.emptyContent
                            }
                        >
                            <h2>
                                Select
                                Conversation
                            </h2>

                            <p>
                                Choose a user
                                from the left
                                sidebar to
                                start messaging
                            </p>
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
                            onChange={(e) =>
                                setGroupName(e.target.value)
                            }
                            className={styles.groupInput}
                        />

                        <div className={styles.groupUsers}>
                            {users.map((u) => (
                                <div
                                    key={u._id}
                                    className={styles.groupUser}
                                    onClick={() =>
                                        handleSelectGroupUser(u._id)
                                    }
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedGroupUsers.includes(
                                            u._id
                                        )}
                                        readOnly
                                    />

                                    <span>{u.fullname}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.modalActions}>
                            <button
                                onClick={() =>
                                    setShowGroupModal(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleCreateGroup}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>


    );


}