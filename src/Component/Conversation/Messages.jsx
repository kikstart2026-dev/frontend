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



    const [unreadCounts, setUnreadCounts] = useState({});
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



    const conversations = useMemo(() => {

        const allConversations =
            conversationData?.conversations || [];

        const uniqueMap = new Map();

        allConversations.forEach((conv) => {

            // GROUP হলে unique by conversation id
            if (conv?.isGroup) {

                uniqueMap.set(conv._id, conv);

                return;
            }

            // OTHER USER
            const otherUser =
                conv?.participants?.find(
                    (p) =>
                        String(p?._id || p) !==
                        String(currentUserId)
                );

            if (!otherUser?._id) return;

            const userId =
                String(otherUser._id);

            const existing =
                uniqueMap.get(userId);

            // latest updated conversation রাখবে
            const currentTime =
                new Date(
                    conv?.updatedAt ||
                    conv?.lastMessageTime ||
                    conv?.createdAt
                ).getTime();

            const existingTime =
                existing
                    ? new Date(
                        existing?.updatedAt ||
                        existing?.lastMessageTime ||
                        existing?.createdAt
                    ).getTime()
                    : 0;

            if (
                !existing ||
                currentTime > existingTime
            ) {
                uniqueMap.set(userId, conv);
            }
        });

        return Array.from(
            uniqueMap.values()
        ).sort((a, b) => {

            const aTime = new Date(
                a?.updatedAt ||
                a?.lastMessageTime ||
                a?.createdAt
            ).getTime();

            const bTime = new Date(
                b?.updatedAt ||
                b?.lastMessageTime ||
                b?.createdAt
            ).getTime();

            return bTime - aTime;
        });

    }, [
        conversationData,
        currentUserId,
    ]);

    /* ================= CREATE CONVERSATION ================= */
    const {
        mutate: createConversationMutate,
        isPending: creatingConversation,
    } = useMutation({
        mutationFn: async (payload) => {

            const res =
                await createConversation(
                    payload
                );

            return (
                res?.data || res
            );
        },

        onSuccess: async (data) => {

            const newConversation =
                data?.conversation;

            if (newConversation) {

                setSelectedConversation(
                    newConversation
                );
            }

            // refresh sidebar
            await refetchConversations();

            queryClient.invalidateQueries({
                queryKey: [
                    "user-conversations",
                    currentUserId,
                ],
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
        createConversationMutate({
            friendlyName:
                selectedUserData.fullname,

            participants: [
                currentUserId,
                selectedUserData._id,
            ],

            isGroup: false,
        });

        setSelectedUser(
            selectedUserData
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
            const sorted = [...messageData.messages].sort(
                (a, b) =>
                    new Date(a.dateCreated) - new Date(b.dateCreated)
            );

            setAllMessages(sorted);
        }
    }, [messageData]);

    /* ================= REALTIME ================= */
    useEffect(() => {

        if (!twilioClient) return;

        const handleMessageAdded = async (message) => {
            await refetchConversations();

            queryClient.invalidateQueries({
                queryKey: ["user-conversations", currentUserId],
            });

            const activeSid =
                selectedConversation?.twilioConversationSid;

            const incomingSid =
                message?.conversationSid ||
                message?.conversation?.sid;

            // 👉 যদি active chat না খোলা থাকে
            if (activeSid === incomingSid) {
                await refetchMessages();
            } else {
                // 🔥 UNREAD COUNT UPDATE
                setUnreadCounts((prev) => {
                    return {
                        ...prev,
                        [incomingSid]: (prev[incomingSid] || 0) + 1,
                    };
                });
            }
        };

        twilioClient.on(
            "messageAdded",
            handleMessageAdded
        );

        return () => {

            twilioClient.removeListener(
                "messageAdded",
                handleMessageAdded
            );
        };

    }, [
        twilioClient,
        currentUserId,
        selectedConversation,
        refetchMessages,
        refetchConversations,
        queryClient,
    ]);




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




    const handleCreateGroup = async () => {

        if (
            !groupName.trim() ||
            selectedGroupUsers.length === 0
        ) {
            return;
        }

        // prevent duplicate click
        if (creatingConversation) return;

        createConversationMutate({
            friendlyName: groupName.trim(),

            participants: [
                currentUserId,
                ...selectedGroupUsers,
            ],

            isGroup: true,

            groupAdmin: currentUserId,
        });

        // close modal
        setShowGroupModal(false);

        // reset fields
        setGroupName("");

        setSelectedGroupUsers([]);
    };


    //==============================================================
    const handleSendMessage = async () => {
        if (!messageText.trim() || !selectedConversation) return;

        const tempMessage = {
            body: messageText,
            author: currentUserId,
            dateCreated: new Date().toISOString(),
            _temp: true,
        };

        // 🔥 OPTIMISTIC MESSAGE ADD (RIGHT PLACE)
        setAllMessages((prev) => [...prev, tempMessage]);

        setMessageText("");

        // SIDEBAR INSTANT UPDATE
        queryClient.setQueryData(
            ["user-conversations", currentUserId],
            (oldData) => {
                if (!oldData?.conversations) return oldData;

                const updated = oldData.conversations.map((conv) => {
                    if (
                        conv.twilioConversationSid ===
                        selectedConversation.twilioConversationSid
                    ) {
                        return {
                            ...conv,
                            lastMessage: messageText,
                            updatedAt: new Date(),
                            lastMessageTime: new Date(),
                        };
                    }
                    return conv;
                });

                updated.sort((a, b) => {
                    const getTime = (x) =>
                        new Date(
                            x?.updatedAt || x?.lastMessageTime
                        ).getTime();

                    return getTime(b) - getTime(a);
                });

                return {
                    ...oldData,
                    conversations: updated,
                };
            }
        );

        // SEND MESSAGE API
        sendMessageMutation.mutate({
            conversationSid: selectedConversation?.twilioConversationSid,
            author: currentUserId,
            message: tempMessage.body,
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
                <div className={styles.topBar}>
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

                    {usersLoading ? (
                        <p className={styles.infoText}>
                            Loading...
                        </p>
                    ) : conversations?.length > 0 ? (

                        conversations.map((conv) => {

                            // ================= OTHER USER =================
                            const otherUser =
                                conv?.participants?.find(
                                    (p) =>
                                        String(p?._id || p) !==
                                        String(currentUserId)
                                );

                            const userImage =
                                otherUser?.image ||
                                otherUser?.profileImage;

                            return (
                                <div
                                    key={conv._id}
                                    className={styles.chatItem}
                                    onClick={() => {

                                        setSelectedConversation(conv);

                                        if (!conv?.isGroup) {
                                            setSelectedUser(otherUser);

                                        }


                                        // 🔥 reset unread
                                        setUnreadCounts((prev) => ({
                                            ...prev,
                                            [conv.twilioConversationSid]: 0,
                                        }));
                                    }}


                                >

                                    {/* GROUP AVATAR */}
                                    {conv?.isGroup ? (

                                        <div className={styles.groupAvatar}>
                                            {getInitial(
                                                conv?.friendlyName
                                            )}
                                        </div>

                                    ) : userImage ? (

                                        <img
                                            src={userImage}
                                            alt="user"
                                        />

                                    ) : (

                                        <div className={styles.userAvatar}>
                                            {getInitial(
                                                otherUser?.fullname
                                            )}
                                        </div>
                                    )}

                                    <div className={styles.chatInfo}>

                                        <h4>
                                            {conv?.isGroup
                                                ? conv?.friendlyName
                                                : otherUser?.fullname}
                                        </h4>

                                        <p>
                                            {conv?.lastMessage ||
                                                "No messages yet"}
                                        </p>

                                    </div>
                                </div>
                            );
                        })

                    ) : (

                        <p className={styles.infoText}>
                            No conversations found
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
                                {!selectedConversation?.isGroup &&
                                    selectedConversationUser?.image ? (
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
                                    const messageUser =
                                        selectedConversation?.participants?.find(
                                            (p) =>
                                                String(p?._id || p) ===
                                                String(msg?.author)
                                        );

                                    const prevMsg =
                                        allMessages[index + 1];

                                    const showAvatar =
                                        !prevMsg ||
                                        prevMsg.author !== msg.author;
                                    const myImage =
                                        user?.image ||
                                        user?.profileImage;

                                    const otherImage =
                                        messageUser?.image ||
                                        messageUser?.profileImage;

                                    return (
                                        <div
                                            key={
                                                index
                                            }
                                            className={`${styles.messageRow}
${isMine
                                                    ? styles.myMessageRow
                                                    : ""
                                                }`}
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
                                                            getInitial(
                                                                messageUser?.fullname
                                                            )
                                                        ))}
                                                </div>
                                            )}

                                            <div className={styles.messageContent}>

                                                {selectedConversation?.isGroup &&
                                                    showAvatar && (
                                                        <p
                                                            className={`${styles.groupSenderName}
                ${isMine ? styles.mySenderName : ""}`}
                                                        >
                                                            {isMine
                                                                ? "You"
                                                                : messageUser?.fullname}
                                                        </p>
                                                    )}

                                                <div
                                                    className={`${styles.messageBubble}
        ${isMine
                                                            ? styles.myBubble
                                                            : styles.otherBubble
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
                                disabled={creatingConversation}
                            >
                                {creatingConversation
                                    ? "Creating..."
                                    : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>


    );


}