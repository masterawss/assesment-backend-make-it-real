import App from './app';
import environment from './config/environment'
import 'dotenv/config'

const app = new App(environment.PORT, environment.DB_URL);

app.listen();
app.connectToTheDatabase();