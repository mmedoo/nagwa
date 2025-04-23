import express from 'express';
import userRoutes from './routes/userRoutes';
import todosRoutes from './routes/todosRoutes';
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
	origin: ['http://localhost:5173'], // Allowed origins
	methods: ['GET', 'POST', 'PUT'], // Allowed HTTP methods
	credentials: true, // Allow cookies
}));

app.use('/', userRoutes);
app.use('/', todosRoutes);

export default app;