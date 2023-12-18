import { serverApp } from './libs/packages/server-application/server-application.js';

await serverApp.initialize().then(app => app.start());
