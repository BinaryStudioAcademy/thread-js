import { encryptSync } from '~/packages/auth/helpers/helpers.js';

const hash = (password: string): string => encryptSync(password);

const usersSeed = [
  {
    email: 'demo@demo.com',
    username: 'demo',
    password: hash('demo')
  },
  {
    email: 'gbottoms1@arizona.edu',
    username: 'jhon',
    password: hash('pxlxvUyyUjE')
  },
  {
    email: 'cclears2@state.gov',
    username: 'alex',
    password: hash('ioyLdS9Mdgj')
  },
  {
    email: 'htie3@chronoengine.com',
    username: 'kivi',
    password: hash('twn50kl')
  },
  {
    email: 'bbirmingham4@guardian.co.uk',
    username: 'avocado',
    password: hash('0naQBpP9')
  }
];

// Do not add more images than the number of users.
const userImagesSeed = [
  {
    link: 'https://i.imgur.com/RS2wGch.png'
  },
  {
    link: 'https://i.imgur.com/7V9tqy6.png'
  },
  {
    link: 'https://i.imgur.com/PhlZpUd.png'
  },
  {
    link: 'https://i.imgur.com/3KHckHc.png'
  }
];

export { userImagesSeed, usersSeed };
