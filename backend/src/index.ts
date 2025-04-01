import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sequenceRoutes from './routes/sequence.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS for development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'your-production-domain.com' 
    : ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/sequences', sequenceRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/email-sequence-designer')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/ping", async (req, res) => {
  return res.json({ message: "pong" });
})
