import { type Image } from './image.type.js';

type User = {
    id: number;
    email: string;
    image: Image;
    imageId: number;
    username: string;
    createdAt: string;
    updatedAt: string;
};

export { type User };
