// components/Notifications.js
"use client";
import { useEffect, useState } from "react";
import { getSocket } from "@/utils/socket";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const socket = getSocket();

  useEffect(() => {
    socket.emit("getNotifications");

    socket.on("notifications", (data) => setNotifications(data));
    socket.on("newNotification", (notif) =>
      setNotifications((prev) => [notif, ...prev])
    );
    socket.on("notificationUpdated", (updatedNotif) => {
      setNotifications((prev) =>
        prev.map((n) => (n._id === updatedNotif._id ? updatedNotif : n))
      );
    });
    socket.on("notificationsDeleted", () => setNotifications([]));

    return () => {
      socket.off("notifications");
      socket.off("newNotification");
      socket.off("notificationUpdated");
      socket.off("notificationsDeleted");
    };
  }, []);

  const markAsRead = (id) => socket.emit("markAsRead", id);
  const deleteAll = () => socket.emit("deleteAll");
  const sendNotification = (msg) => socket.emit("sendNotification", msg);

  return (
    <div>
      <button onClick={() => sendNotification("اشعار جديد")}>
        ارسال اشعار
      </button>
      <button onClick={deleteAll}>مسح الكل</button>
      <ul>
        {notifications.map((n) => (
          <li key={n._id} style={{ color: n.read ? "gray" : "black" }}>
            {n.message}
            {!n.read && (
              <button onClick={() => markAsRead(n._id)}>قراءه</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
