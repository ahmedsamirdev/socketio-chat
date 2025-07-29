interface ChatMessageProps {
  message: string;
  sender: string;
  isOwnMessage: boolean;
}

export default function ChatMessage({
  message,
  sender,
  isOwnMessage,
}: ChatMessageProps) {
  const isSystemMessage = sender === "System";
  return (
    <div
      className={`mb-3 flex ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs rounded-md p-3 ${
          isSystemMessage
            ? "bg-gray-100 text-center"
            : isOwnMessage
            ? "bg-gray-100"
            : "bg-blue-100"
        }`}
      >
        <p
          className={`text-sm font-semibold mb-1 ${
            isSystemMessage
              ? "text-gray-600"
              : isOwnMessage
              ? "text-gray-600"
              : "text-blue-600"
          }`}
        >
          {isSystemMessage ? (
            <>
              <span className="ml-2 font-bold text-black">{sender}</span>
            </>
          ) : isOwnMessage ? (
            "You"
          ) : (
            sender
          )}
        </p>
        <p className="text-sm text-gray-900">{message}</p>
      </div>
    </div>
  );
}
