import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Grocery Delivery App API with Socket.io is running...');
});

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // When an admin or system updates an order status, broadcast it to delivery partners
  socket.on('updateOrderStatus', (data) => {
    console.log('Order updated:', data);
    io.emit('orderStatusUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
