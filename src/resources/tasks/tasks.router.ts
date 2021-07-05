import express, { Request } from 'express';

import * as tasksService from './tasks.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (_req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
});

router.route('/:id').get(async (req, res, next) => {
    try {
        const task = await tasksService.getById(req.params.id);
        res.json(task);
    } catch (err) {
        next(err);
    }
});

router.route('/').post(async (req: Request, res) => {
    const boardId = req.params['id'];
    const task = await tasksService.create({ ...req.body, boardId });
    res.status(201).json(task);
});

router.route('/:id').put(async (req, res, next) => {
    try {
        const task = await tasksService.update(req.params.id, req.body);
        res.json({ task, message: 'Task successfully updated' });
    } catch (err) {
        next(err);
    }
});

router.route('/:id').delete(async (req, res, next) => {
    try {
        const task = await tasksService.remove(req.params.id);
        res.json({ task, message: 'Task successfully deleted' });
    } catch (err) {
        next(err);
    }
});

export default router;
