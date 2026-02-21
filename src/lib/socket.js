// import io from "socket.io-client";

// let socket = null;

// export const getSocket = () => {
//   if (!socket) {
//     socket = io("http://localhost:3000", {
//       transports: ["websocket"], // مهم جداً
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 1000,
//     });
//   }

//   return socket;
// };

let ws;

export function connect(username, onMessageReceived) {
  ws = new WebSocket("ws://localhost:3000/api/socket");

  ws.onopen = () => {
    console.log("WebSocket Connected");
    // تسجيل الاسم
    ws.send(JSON.stringify({ action: "register", sender: username }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessageReceived(data);
  };

  ws.onclose = () => console.log("WebSocket disconnected");
}

export function sendNotification(notification) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.error("WebSocket not connected");
    return;
  }

  ws.send(JSON.stringify(notification));
}
