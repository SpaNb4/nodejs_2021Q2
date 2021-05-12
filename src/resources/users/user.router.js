const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
    try {
        const user = await usersService.getById(req.params.id);
        res.json(User.toResponse(user));
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route('/').post(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
    try {
        const user = await usersService.updateUser(req.params.id, req.body);
        res.json({ user, message: 'User successfully updated' });
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const user = await usersService.deleteUser(req.params.id);
        res.json({ user, message: 'User successfully deleted' });
    } catch (err) {
        res.status(404).json(err.message);
    }
});

module.exports = router;
