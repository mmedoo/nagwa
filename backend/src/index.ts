import app from './app';
import sequelize from './db';
import { initTodosModel } from './models/todos.model';
import { initUserModel } from './models/user.model';

const PORT = 1234;

initUserModel();
initTodosModel();

sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}`);
	});
})


export default app;