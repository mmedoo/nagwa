import express from 'express';
import userRoutes from './routes/user.route';
import todosRoutes from './routes/todos.route';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());

app.head('/', (_req, res) => {
	res.status(200).end();
});

app.use(cors({
	origin: ['http://localhost:5173'], // Allowed origins
	methods: ['GET', 'POST', 'PUT'], // Allowed HTTP methods
	credentials: true, // Allow cookies
}));

app.use('/', userRoutes);
app.use('/', todosRoutes);

export default app;