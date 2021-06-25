import express, { Request, Response } from 'express';
import * as loginService from './login.service';

const router = express.Router();

router.route('/').post(async (req: Request, res: Response) => {
    try {
        const token = await loginService.getToken(req.body);
        res.json(token);
    } catch (err) {
        res.status(404).json(err.message);
    }
});

export default router;
