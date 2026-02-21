// "use client";
// import { useEffect } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// export default function Notifications() {
//   useEffect(() => {
//     const socket = new SockJS("http://72.167.149.231:8080/ws");

//     const stompClient = new Client({
//       webSocketFactory: () => socket,
//       debug: (str) => console.log(str),
//       reconnectDelay: 5000,
//     });

//     stompClient.onConnect = () => {
//       console.log("Connected to Spring WebSocket!");

//       stompClient.subscribe("/topic/updates", (msg) => {
//         console.log("New notification:", msg.body);
//       });
//     };

//     stompClient.activate();

//     return () => stompClient.deactivate();
//   }, []);

//   return <h1>Listening...</h1>;
// }

"use client";

import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function NotificationSocket() {
  const [notifications, setNotifications] = useState([]);

  const userId = 126;
  useEffect(() => {
    const socket = new SockJS("https://backend.weeein.com/ws");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: () => {},
    });

    stompClient.onConnect = () => {
      console.log("Connected WS");

      // subscribe حسب user
      stompClient.subscribe(
        `/user/${userId}/queue/notifications`,
        (message) => {
          const data = JSON.parse(message.body);
          console.log("NEW NOTIFICATION:", data);

          setNotifications((prev) => [data, ...prev]);
        }
      );
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [userId]);

  return (
    <div>
      {notifications?.map((n, i) => (
        <p key={i}>{n.title}</p>
      ))}
    </div>
  );
}
