const bcrypt = require('bcrypt');

const encrypt = password => bcrypt.hashSync(password, 10);
const now = new Date();

module.exports = [{
    email: 'rrourke0@hubpages.com',
    username: 'wskellion0',
    password: encrypt('s6chfx'),
    isActive: true,
    createdAt: now,
    updatedAt: now
}, {
    email: 'gbottoms1@arizona.edu',
    username: 'thartwright1',
    password: encrypt('pxlxvUyyUjE'),
    isActive: true,
    createdAt: now,
    updatedAt: now
}, {
    email: 'cclears2@state.gov',
    username: 'bkopps2',
    password: encrypt('ioyLdS9Mdgj'),
    isActive: true,
    createdAt: now,
    updatedAt: now
}, {
    email: 'htie3@chronoengine.com',
    username: 'kmitchinson3',
    password: encrypt('twn50kl'),
    isActive: true,
    createdAt: now,
    updatedAt: now
}, {
    email: 'bbirmingham4@guardian.co.uk',
    username: 'fbrabon4',
    password: encrypt('0naQBpP9'),
    isActive: true,
    createdAt: now,
    updatedAt: now
}];
