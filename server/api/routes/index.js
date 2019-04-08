import userRoutes from './user.routes';

export default (app) => {
    app.use('/api/users', userRoutes);
};
