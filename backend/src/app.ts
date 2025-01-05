import express, { Request, Response } from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to BE');
});
app.use('/api', routes);
app.use(errorHandler);
export default app;
