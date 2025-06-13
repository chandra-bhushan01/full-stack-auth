
const express = require("express");
const { AuthRoutes } = require("./routes/auth.route");
const env = require("dotenv").config()
const cors = require('cors');
const { UserRoutes } = require("./routes/user.route");
const http = require('http')
const {Server} = require('socket.io');


const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:4200", // ✅ Angular frontend origin
    credentials: true
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:4200', // Angular dev server
  credentials: true
}))



app.use("/auth",AuthRoutes)
app.use("/user",UserRoutes)


//web shocket logics are implemented here
io.on('connection', client => {
  client.on('disconnect', () => { /* ___ */ });
  client.on('message', (data) => {
    console.log("📩 Received from frontend:", data); // should print "hello from angular frontend"

    // 👇 Send a reply back to the client
    client.emit('messageReply', 'Hello from backend!');
  });
});



const PORT = process.env.PORT|| 3000;
httpServer.listen(PORT,()=>{
    console.log(`App is running on: http://localhost:${PORT}`)
})