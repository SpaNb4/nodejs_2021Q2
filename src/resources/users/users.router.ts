import express from 'express';
import User from './users.model';
import * as usersService from './users.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
    try {
        const user = await usersService.getById(req.params.id);
        res.json(User.toResponse(user!));
    } catch (err) {
        next(err);
    }
});

router.route('/').post(async (req, res) => {
    const user = await usersService.create(req.body);
    res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res, next) => {
    try {
        const user = await usersService.update(req.params.id, req.body);
        res.json({ user, message: 'User successfully updated' });
    } catch (err) {
        next(err);
    }
});

router.route('/:id').delete(async (req, res, next) => {
    try {
        const user = await usersService.remove(req.params.id);
        res.json({ user, message: 'User successfully deleted' });
    } catch (err) {
        next(err);
    }
});

export default router;
