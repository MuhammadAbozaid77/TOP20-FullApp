import { WebSocketServer } from "ws";

let wss;

export default function handler(req, res) {
  if (!res.socket.server.wss) {
    // إنشاء WebSocket Server مرة واحدة
    wss = new WebSocketServer({ server: res.socket.server });
    res.socket.server.wss = wss;

    // تخزين جميع الاتصالات
    const clients = new Map(); // username => ws

    wss.on("connection", (ws, req) => {
      console.log("Client connected");

      // انتظار الرسائل من العميل
      ws.on("message", (msg) => {
        try {
          const data = JSON.parse(msg);
          const { type, sender, receiver, message } = data;

          // إذا العميل أول مرة يرسل اسمه نحتفظ به
          if (data.action === "register") {
            clients.set(sender, ws);
            console.log(`Registered client: ${sender}`);
            return;
          }

          const notification = {
            sender,
            receiver: receiver || null,
            message,
            type,
          };

          if (type === "PRIVATE" && receiver && clients.has(receiver)) {
            clients.get(receiver).send(JSON.stringify(notification));
          } else {
            // إرسال لجميع العملاء
            for (let client of clients.values()) {
              if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(notification));
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      });

      ws.on("close", () => {
        // إزالة العميل عند اغلاق الاتصال
        for (let [username, clientWs] of clients.entries()) {
          if (clientWs === ws) clients.delete(username);
        }
        console.log("Client disconnected");
      });
    });

    console.log("WebSocket server created");
  }

  res.end();
}
