"use client";
import { useState } from "react";

export default function ChatForms({
  onSendMessage,
}: {
  onSendMessage?: (message: string) => void;
}) {
  const [messages, setMessages] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (messages.trim() !== "") {
      onSendMessage?.(messages);
      setMessages("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        onChange={(event) => setMessages(event.target.value)}
        value={messages}
        type="text"
        placeholder="Type your message..."
        className="flex-grow rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!messages.trim()}
        className="inline-flex cursor-pointer disabled:cursor-auto disabled:bg-gray-500 min-w-[90px] items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      >
        Send
      </button>
    </form>
  );
}
