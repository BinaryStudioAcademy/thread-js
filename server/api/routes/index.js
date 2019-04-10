import authRoutes from './auth.routes';

export default (app) => {
    app.use('/api/auth', authRoutes);
};
