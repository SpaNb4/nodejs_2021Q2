const faker = require('faker');

function generateRandomPayload(userContext, events, done) {
    const payload = {
        name: 'Name',
        login: 'Login',
    };
    payload.name = faker.name.findName();
    payload.login = faker.internet.email();
    userContext.vars.payload = payload;
    return done();
}

module.exports = {
    generateRandomPayload,
};
