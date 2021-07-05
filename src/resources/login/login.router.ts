import express, { Request, Response } from 'express';
import * as loginService from './login.service';

const router = express.Router();

router.route('/').post(async (req: Request, res: Response, next) => {
    try {
        const token = await loginService.getToken(req.body);
        res.json({ token });
    } catch (err) {
        next(err);
    }
});

export default router;
