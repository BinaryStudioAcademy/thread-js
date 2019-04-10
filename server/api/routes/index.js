import authRoutes from './auth.routes';
import postRoutes from './post.routes';

export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
};
