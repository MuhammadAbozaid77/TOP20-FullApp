import { getSocket } from "@/lib/socket";
const socket = getSocket();

// إرسال إشعار جديد
export const handleSend = ({ newMessage }) => {
  if (!newMessage) return;
  socket.emit("sendNotification", newMessage);
  setNewMessage("");
};

// تمييز كمقروء
export const handleMarkAsRead = (id) => socket.emit("markAsRead", id);

// حذف كل الإشعارات
export const handleDeleteAll = () => socket.emit("deleteAll");
