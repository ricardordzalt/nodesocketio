const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
    // allowEIO3: true,
});

const PORT = 8880;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("video_stream", (data) => {
        console.log('received', data);
        try {
            const base64data = new Buffer.from(data?.data).toString('base64');
            console.log(base64data);
        } catch (e) {
            console.log(`error: ${e}`);
        };
    });
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});