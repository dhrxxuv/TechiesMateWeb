import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseApi } from "../utils/api";

let socket = null;

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const endOfMessagesRef = useRef(null);

  const Connections = useSelector((store)=>store.Connection)

  const toUser =  Connections.filter((connection)=>connection._id===targetUserId)
  console.log("hi",toUser)
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${baseApi}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => ({
        sender: msg?.senderId?.firstName,
        text: msg?.text,
        time: new Date(msg?.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ sender, text, time }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender,
          text,
          time: new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (input.trim() === "" || !socket) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: input,
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-2 sm:p-4 bg-gray-100">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-center">Chat {toUser[0].firstName} {toUser[0].lastName}</h2>

      <div className="flex-1 overflow-y-auto scrollbar-none mb-2 sm:mb-4 p-2 sm:p-4 bg-white rounded shadow space-y-4">
        {messages.map((msg, index) => {
          const isSender = msg.sender === user.firstName;

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isSender ? "items-end" : "items-start"
              }`}
            >
              <div className="text-xs sm:text-sm text-gray-600 mb-1">{msg.sender}</div>
              <div
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg max-w-[75%] break-words ${
                  isSender
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-green-200 text-black rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 mt-1">{msg.time}</div>
            </div>
          );
        })}
        <div ref={endOfMessagesRef}></div>
      </div>

      <div className="flex w-full">
        <input
          type="text"
          className="flex-1 p-2 text-sm sm:text-base rounded-l border border-gray-300 focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 text-sm sm:text-base rounded-r hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
