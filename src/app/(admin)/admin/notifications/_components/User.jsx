"use client";

import { connect } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function User({ username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connect(username, (msg) => setMessages((prev) => [...prev, msg]));
  }, [username]);

  return (
    <div>
      <h1>User Panel ({username})</h1>
      {messages.map((m, i) => (
        <p key={i}>
          {m.sender}: {m.message}
        </p>
      ))}
    </div>
  );
}
