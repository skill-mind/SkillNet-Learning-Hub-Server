import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an HTTP server
const httpServer = createServer();

// Initialize Socket.IO server with CORS configuration
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",  // Allow requests from this origin
        methods: ["GET", "POST"],        // Allow these HTTP methods
    },
});

// Handle new socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle a custom event, for example, a 'message' event
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        // Broadcast the message to all clients
        io.emit('message', msg);
    });

    // Handle disconnection event
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the HTTP server and listen on port 3000
let port = process.env.PORT || 8000;
httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
