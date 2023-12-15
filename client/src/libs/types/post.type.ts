import { Comment } from "./comment.type.js";
import { Image } from "./image.type.js";
import { User } from "./user.type.js";

type Post = {
    id: number;
    body: string;
    updatedAt: string;
    createdAt: string;
    image: Image;
    likeCount: string | number;
    dislikeCount: string | number;
    commentCount: string | number;
    comments: Comment[];
    userId: number;
    user: Omit<User, "createdAt" | "updatedAt">
};

export { type Post };
