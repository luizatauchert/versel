import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './db/data-source';
import routes from './routes/RoutesUser';
import cors from "cors"
import path from 'path';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'localhost:3000'
}));

app.use(express.static('public'));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/entrar.html"));
});

AppDataSource.initialize()
    .then(() => {
        app.use('/api', routes);
        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));