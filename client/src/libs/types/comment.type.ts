import { User } from "./user.type.js";

type Comment = {
    id: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    postId: number;
    userId: number;
    user: Omit<User, "createdAt" | "updatedAt">
};

export { type Comment };
