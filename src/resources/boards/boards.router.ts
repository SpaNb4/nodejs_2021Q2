import express from 'express';
import * as boardsService from './boards.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
});

router.route('/:id').get(async (req, res, next) => {
    try {
        const board = await boardsService.getById(req.params.id);
        res.json(board);
    } catch (err) {
        next(err);
    }
});

router.route('/').post(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.status(201).json(board);
});

router.route('/:id').put(async (req, res, next) => {
    try {
        const board = await boardsService.update(req.params.id, req.body);
        res.json({ board, message: 'Board successfully updated' });
    } catch (err) {
        next(err);
    }
});

router.route('/:id').delete(async (req, res, next) => {
    try {
        const board = await boardsService.remove(req.params.id);
        res.json({ board, message: 'Board successfully deleted' });
    } catch (err) {
        next(err);
    }
});

export default router;
