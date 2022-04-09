import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import AppRoutes from './routes/index'; 

class App {
  public app: express.Application;
  public port: number;
  public dbUrl: string;
  // public config = process.env;
  appRoutes = AppRoutes
 
  constructor(port:number, dbUrl: string) {
    this.app = express();
    this.port = port;
    this.dbUrl = dbUrl;
 
    this.initializeMiddlewares();
    this.initializeRouters(this.appRoutes);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
  // Initialize all the routes of the application
  private initializeRouters(router:any) {
    router.forEach((routes:any) => {
      this.app.use('/', routes);
    });
  }
 
  // Server will listen to this port
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  // Connecting to mongo DB
  public connectToTheDatabase() {
    console.log("Connecting to mongo DB", this.dbUrl);	  
    mongoose.connect(this.dbUrl!);
  }
}
 
export default App;