import app from './app';
import sequelize from './db';
import initUserModel from './models/userModel';
import initTodosModel from './models/todosModel';

initUserModel(sequelize);
initTodosModel(sequelize);

const PORT = 1234;

sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}`);
	});
});
