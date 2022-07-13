const express = require("express");
const app = express();

/*
Socket.io
URL https://socket.io/
Get Started https://socket.io/get-started/chat

ソケットは、従来、ほとんどのリアルタイムチャットシステムが構築されているソリューションで、クライアントとサーバー間の双方向通信チャネルを提供しています。
これは、サーバーがクライアントにメッセージをプッシュできることを意味します。チャットメッセージを書くと、サーバーがそれを取得し、接続している他のすべてのクライアントにプッシュするというものです。
*/

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
      // or with an array of origins
      // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    credentials: true
  }
  });

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// クライアント（Next.js）側と通信
io.on("connection", (socket) => {
  console.log("クライアントと接続しました");

  // クライアントからのデータを受信
  socket.on("send_message", (data) => {
    // console.log(data);

    // 受信したdataを接続中のすべてのクライアントに送信する
    io.emit("received_message", data);
  })

  socket.on("disconnect", () => {
    console.log("クライアントとの接続が切れました");
  })
});


const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Backend server is listening on http://localhost:${PORT}`);
})
