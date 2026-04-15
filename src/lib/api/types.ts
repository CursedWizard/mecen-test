export type PostTier = 'free' | 'paid';

export type Author = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  subscribersCount?: number;
  isVerified?: boolean;
};

export type Post = {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  tier: PostTier;
  createdAt: string;
};

export type PostsPage = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type ApiPostsResponse = {
  ok: boolean;
  data: PostsPage;
};

export type LikeResponseData = {
  isLiked: boolean;
  likesCount: number;
};

export type ApiLikeResponse = {
  ok: boolean;
  data: LikeResponseData;
};

export type Comment = {
  id: string;
  postId: string;
  author: Author;
  text: string;
  createdAt: string;
};

export type CommentsPage = {
  comments: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type ApiCommentsResponse = {
  ok: boolean;
  data: CommentsPage;
};

export type ApiCommentCreatedResponse = {
  ok: boolean;
  data: {
    comment: Comment;
  };
};

export type ApiPostDetailResponse = {
  ok: boolean;
  data: {
    post: Post;
  };
};
