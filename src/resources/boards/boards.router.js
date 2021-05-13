const router = require('express').Router();
const boardsService = require('./boards.service');

router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
});

router.route('/:id').get(async (req, res) => {
    try {
        const board = await boardsService.getById(req.params.id);
        res.json(board);
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route('/').post(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
    try {
        const board = await boardsService.update(req.params.id, req.body);
        res.json({ board, message: 'Board successfully updated' });
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const board = await boardsService.remove(req.params.id);
        res.json({ board, message: 'Board successfully deleted' });
    } catch (err) {
        res.status(404).json(err.message);
    }
});

module.exports = router;
