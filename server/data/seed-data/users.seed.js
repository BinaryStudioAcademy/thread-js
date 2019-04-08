const bcrypt = require('bcrypt');

const hash = password => bcrypt.hashSync(password, 10);
const now = new Date();

const usersSeed = [{
    email: 'rrourke0@hubpages.com',
    username: 'wskellion0',
    password: hash('s6chfx')
}, {
    email: 'gbottoms1@arizona.edu',
    username: 'thartwright1',
    password: hash('pxlxvUyyUjE')
}, {
    email: 'cclears2@state.gov',
    username: 'bkopps2',
    password: hash('ioyLdS9Mdgj')
}, {
    email: 'htie3@chronoengine.com',
    username: 'kmitchinson3',
    password: hash('twn50kl')
}, {
    email: 'bbirmingham4@guardian.co.uk',
    username: 'fbrabon4',
    password: hash('0naQBpP9')
}].map(user => ({
    ...user,
    isActive: true,
    createdAt: now,
    updatedAt: now
}));

// Do not add more images than the number of users.
const userImagesSeed = [
    'https://s3.amazonaws.com/uifaces/faces/twitter/nasirwd/128.jpg',
    'https://s3.amazonaws.com/uifaces/faces/twitter/emileboudeling/128.jpg',
    'https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg',
    'https://s3.amazonaws.com/uifaces/faces/twitter/gauchomatt/128.jpg'
].map(imagePath => ({
    path: imagePath,
    isActive: true,
    createdAt: now,
    updatedAt: now
}));

module.exports = {
    usersSeed,
    userImagesSeed
};
