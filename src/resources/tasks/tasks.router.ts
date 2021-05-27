import express from 'express';
import * as tasksService from './tasks.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (_req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
    try {
        const task = await tasksService.getById(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route('/').post(async (req, res) => {
    const task = await tasksService.create({ ...req.body, boardId: req.params.id });
    res.status(201).json(task);
});

router.route('/:id').put(async (req, res) => {
    try {
        const task = await tasksService.update(req.params.id, req.body);
        res.json({ task, message: 'Task successfully updated' });
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const task = await tasksService.remove(req.params.id);
        res.json({ task, message: 'Task successfully deleted' });
    } catch (err) {
        res.status(404).json(err.message);
    }
});

export default router;
