import morgan from 'morgan';
import { Request } from 'express';

morgan.token('body', (req: Request, _res) => JSON.stringify(req.body));
morgan.token('query', (req: Request, _res) => JSON.stringify(req.query));
export default morgan(':method :url :status :body :req[params] :query');
