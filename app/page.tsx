"use client";
import ChatForms from "@/components/ChatForms";
import ChatMessage from "@/components/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";
import Card from "@/components/Card";

export default function Home() {
  const [room, setRoom] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  const isFormValid = room.trim() !== "" && userName.trim() !== "";

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (message) => {
      console.log("Received user_joined:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };

  const handleJoinRoom = () => {
    if (room && userName) {
      socket.emit("joinRoom", { room, userName });
      setJoined(true);
    }
  };

  return (
    <div className="font-sans mt-24 flex flex-col items-center ">
      {!joined ? (
        // <div className="flex flex-col items-center justify-center">
        //   <h1 className="f">join a room</h1>

        //   <input
        //     type="text"
        //     placeholder="Enter your name"
        //     value={userName}
        //     onChange={(e) => setUserName(e.target.value)}
        //     className="px-4 py-2 border rounded-md"
        //   />
        //   <input
        //     type="text"
        //     placeholder="Enter room name"
        //     value={room}
        //     onChange={(e) => setRoom(e.target.value)}
        //     className="px-4 py-2 border rounded-md mt-2"
        //   />
        //   <button
        //     onClick={handleJoinRoom}
        //     className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
        //   >
        //     Join Room
        //   </button>
        // </div>
        <>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Create or join exisiting room
          </h1>
          <form className="flex flex-col items-center justify-center">
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Room
              </label>
              <div className="mt-2">
                <input
                  id="room"
                  placeholder="Enter room name"
                  name="room"
                  onChange={(e) => setRoom(e.target.value)}
                  type="text"
                  autoComplete="room"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <button
                type="submit"
                onClick={handleJoinRoom}
                disabled={!isFormValid}
                className="w-full mt-4 disabled:bg-gray-500 disabled:cursor-auto cursor-pointer rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
              >
                Join room
              </button>
            </div>
          </form>
        </>
      ) : (
        <main className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-bold">Room: {room}</h1>
          <Card>
            {messages.length === 0 ? (
              <p className="text-center text-gray-400">No messages yet.</p>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg.message}
                  sender={msg.sender}
                  isOwnMessage={msg.sender === userName}
                />
              ))
            )}
          </Card>
          <ChatForms onSendMessage={handleSendMessage} />
        </main>
      )}
    </div>
  );
}
