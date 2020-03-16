import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

// import routes
import indexRoutes from './routes/indexRoutes';
import ProductRouter from './routes/ProductRoutes';
import CategoryRoutes from './routes/CategoryRoutes';

// Server Class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        const MONGO_URI = 'mongodb://localhost/ecommerce';
        mongoose.set('useFindAndModify', false);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log('Mongodb Connection stablished');
        });

        connection.on('error', (err) => {
            console.log('Mongodb connection error:', err);
        process.exit();
        });
            // Settings
        this.app.set('port', process.env.PORT || 4000);
        // middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/', indexRoutes);
        this.app.use('/api/products', ProductRouter);
        this.app.use('/api/categories', CategoryRoutes);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listenning on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();