import cryptoHelper from '../../helpers/crypto.helper';

const hash = password => cryptoHelper.encryptSync(password);
const now = new Date();

export const usersSeed = [{
    email: 'demo@demo.com',
    username: 'demo',
    password: hash('demo')
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
    createdAt: now,
    updatedAt: now
}));

// Do not add more images than the number of users.
export const userImagesSeed = [{
    link: 'https://i.imgur.com/dJbN8ib.jpg',
    deleteHash: 'HVkRkOtyNHVIyp3'
}, {
    link: 'https://i.imgur.com/3AKJHOK.jpg',
    deleteHash: 'iO2T1f6HuB8xjAU'
}, {
    link: 'https://i.imgur.com/kX8OeH3.jpg',
    deleteHash: 'SEGM6QPylAbRWAA'
}, {
    link: 'https://i.imgur.com/aqZiLzq.jpg',
    deleteHash: 'jHIj5YNdNOQ3FBj'
}].map(image => ({
    ...image,
    createdAt: now,
    updatedAt: now
}));
