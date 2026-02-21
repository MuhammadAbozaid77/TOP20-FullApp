"use client";
import { useState, useEffect } from "react";
import { connect, sendNotification } from "@/lib/socket";

export default function Admin() {
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connect("Admin", (msg) => setMessages((prev) => [...prev, msg]));
  }, []);

  const handleSend = () => {
    sendNotification({
      sender: "Admin",
      receiver: receiver || null,
      message,
      type: receiver ? "PRIVATE" : "GENERAL",
    });
    setMessage("");
  };

  return (
    <div>
      <NotificationClient />

      <h1>Admin Panel</h1>
      <input
        placeholder="Receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>

      <div>
        <h2>Received Messages:</h2>
        {messages.map((m, i) => (
          <p key={i}>
            {m.sender}: {m.message}
          </p>
        ))}
      </div>
    </div>
  );
}
