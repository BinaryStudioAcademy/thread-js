import authRoutes from './auth.routes';
import postRoutes from './post.routes';
import imageRoutes from './image.routes';

export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/images', imageRoutes);
};
