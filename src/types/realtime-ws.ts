import type { Comment } from '@/lib/api/types';

export type RealtimeWsPingMessage = {
  type: 'ping';
};

export type RealtimeWsLikeUpdatedMessage = {
  type: 'like_updated';
  postId: string;
  likesCount: number;
};

export type RealtimeWsCommentAddedMessage = {
  type: 'comment_added';
  postId: string;
  comment: Comment;
};

export type RealtimeWsServerMessage =
  | RealtimeWsPingMessage
  | RealtimeWsLikeUpdatedMessage
  | RealtimeWsCommentAddedMessage;
