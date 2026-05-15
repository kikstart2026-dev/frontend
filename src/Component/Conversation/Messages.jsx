import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import {
    FiMoreVertical,
    FiSearch,
    FiSend,
} from "react-icons/fi";

import { Client } from "@twilio/conversations";

import {
    generateToken,
    getMessages,
    getUserConversations,
    sendMessage,
    getChatUsers,
} from "../../apis/api";

import styles from "./Messages.module.scss";

export default function Messages() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageText, setMessageText] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [twilioClient, setTwilioClient] = useState(null);

    const messageEndRef = useRef(null);

    /* ================= TOKEN ================= */
    const tokenMutation = useMutation({
        mutationKey: ["generate-token"],
        mutationFn: async () => {
            return await generateToken({
                identity: user?.id,
            });
        },

        onSuccess: async (data) => {
            try {
                const token = data?.token || data?.data?.token;

                if (!token) {
                    console.log("Token not found");
                    return;
                }

                const client = await Client.create(token);

                setTwilioClient(client);
            } catch (error) {
                console.log("Twilio client error:", error);
            }
        },
    });

    useEffect(() => {
        if (user?.id) {
            tokenMutation.mutate();
        }
    }, [user?.id]);

    /* ================= USERS FETCH ================= */
    const { data: usersData, isLoading: usersLoading } = useQuery({
        queryKey: ["chat-users"],

        queryFn: async () => {
            const res = await getChatUsers();

            console.log("Users API Response:", res);

            return res.data;
        },

        enabled: !!user?.id,
    });

    /* ================= USERS ================= */
    const users = useMemo(() => {
        return usersData?.users || [];
    }, [usersData]);

    /* ================= CONVERSATIONS ================= */
    const { data: conversationData } = useQuery({
        queryKey: ["user-conversations", user?.id],

        queryFn: async () => {
            const res = await getUserConversations(user?.id);

            return res.data;
        },

        enabled: !!user?.id,
    });

    /* ================= MESSAGES ================= */
    const { data: messageData, refetch: refetchMessages } = useQuery({
        queryKey: [
            "conversation-messages",
            selectedConversation?.twilioConversationSid,
        ],

        queryFn: async () => {
            const res = await getMessages(
                selectedConversation?.twilioConversationSid
            );

            return res.data;
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

        const handleNewMessage = (message) => {
            setAllMessages((prev) => [...prev, message]);
        };

        twilioClient.on("messageAdded", handleNewMessage);

        return () => {
            twilioClient.removeListener(
                "messageAdded",
                handleNewMessage
            );
        };
    }, [twilioClient]);

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

        onSuccess: () => {
            setMessageText("");
            refetchMessages();
        },
    });

    const handleSendMessage = () => {
        if (!messageText.trim()) return;

        sendMessageMutation.mutate({
            conversationSid:
                selectedConversation?.twilioConversationSid,

            author: user?.id,

            message: messageText,
        });
    };

    /* ================= FILTER USERS ================= */
    const filteredUsers = useMemo(() => {
        return users.filter((u) =>
            u?.fullname
                ?.toLowerCase()
                ?.includes(searchText.toLowerCase())
        );
    }, [users, searchText]);

    return (
        <div className={styles.wrapper}>
            {/* LEFT SIDE */}
            <div className={styles.leftSide}>
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

                {/* USERS LIST */}
                <div className={styles.chatList}>
                    {usersLoading ? (
                        <p style={{ padding: "10px" }}>
                            Loading...
                        </p>
                    ) : filteredUsers?.length > 0 ? (
                        filteredUsers.map((u) => (
                            <div
                                key={u._id}
                                className={styles.chatItem}
                                onClick={() =>
                                    console.log(
                                        "Selected User:",
                                        u
                                    )
                                }
                            >
                                <img
                                    src="https://i.pravatar.cc/150"
                                    alt="user"
                                />

                                <div className={styles.chatInfo}>
                                    <h4>{u.fullname}</h4>

                                    <p>{u.email}</p>
                                </div>
                            </div>
                        ))
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
                        <div className={styles.chatHeader}>
                            <div className={styles.userInfo}>
                                <img
                                    src={
                                        selectedConversation?.groupImage ||
                                        "https://i.pravatar.cc/150"
                                    }
                                    alt="user"
                                />

                                <div>
                                    <h3>
                                        {
                                            selectedConversation?.friendlyName
                                        }
                                    </h3>

                                    <span>Online</span>
                                </div>
                            </div>

                            <button>
                                <FiMoreVertical />
                            </button>
                        </div>

                        {/* MESSAGES */}
                        <div className={styles.messageBody}>
                            {allMessages?.map((msg, index) => {
                                const isMine =
                                    msg?.author === user?.id;

                                return (
                                    <div
                                        key={index}
                                        className={`${
                                            styles.messageRow
                                        } ${
                                            isMine
                                                ? styles.myMessageRow
                                                : ""
                                        }`}
                                    >
                                        {!isMine && (
                                            <img
                                                src="https://i.pravatar.cc/150"
                                                alt="avatar"
                                                className={
                                                    styles.messageAvatar
                                                }
                                            />
                                        )}

                                        <div
                                            className={`${
                                                styles.messageBubble
                                            } ${
                                                isMine
                                                    ? styles.myBubble
                                                    : styles.otherBubble
                                            }`}
                                        >
                                            {msg?.body}
                                        </div>
                                    </div>
                                );
                            })}

                            <div ref={messageEndRef} />
                        </div>

                        {/* INPUT */}
                        <div className={styles.messageInputBox}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={messageText}
                                onChange={(e) =>
                                    setMessageText(
                                        e.target.value
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendMessage();
                                    }
                                }}
                            />

                            <button
                                onClick={handleSendMessage}
                            >
                                <FiSend />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyChat}>
                        <div className={styles.emptyContent}>
                            <h2>Select Conversation</h2>

                            <p>
                                Choose a user from the
                                left sidebar to start
                                messaging
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}