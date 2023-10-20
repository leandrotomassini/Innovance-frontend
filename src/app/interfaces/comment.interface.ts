import { User } from "../auth/interfaces";

export interface CommentVideo {
    idComment: string;
    status:    boolean;
    updatedAt: Date;
    comment:   string;
    user: User;
}
