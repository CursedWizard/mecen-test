import type { Comment } from '@/lib/api/types';
import { incrementPostCommentsCountInCaches, updatePostLikesCountInCaches } from '@/queries/feed';
import { appendPostCommentFromRealtimeIfAllPagesLoaded } from '@/queries/post-detail';
import { authStore } from '@/store/auth-store';
import type { RealtimeWsServerMessage } from '@/types/realtime-ws';
import { buildFeedRealtimeWebSocketUrl } from '@/utils/feed-detail-websocket-url';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

const RECONNECT_MS = 1500;

function tryParseServerMessage(data: string): RealtimeWsServerMessage | null {
  try {
    const msg: unknown = JSON.parse(data);
    if (!msg || typeof msg !== 'object') return null;
    const type = (msg as { type?: unknown }).type;
    if (type === 'ping') return { type: 'ping' };
    if (type === 'like_updated') {
      const postId = (msg as { postId?: unknown }).postId;
      const likesCount = (msg as { likesCount?: unknown }).likesCount;
      if (typeof postId === 'string' && typeof likesCount === 'number' && Number.isFinite(likesCount)) {
        return { type: 'like_updated', postId, likesCount };
      }
    }
    if (type === 'comment_added') {
      const postId = (msg as { postId?: unknown }).postId;
      const comment = (msg as { comment?: unknown }).comment;
      if (typeof postId === 'string' && comment !== null && typeof comment === 'object') {
        return { type: 'comment_added', postId, comment: comment as Comment };
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Subscribes to feed realtime WebSocket while `enabled` (e.g. post detail route with an id).
 * Updates TanStack caches on `like_updated` and `comment_added` (comments count; optionally appends the comment when all comment pages are loaded).
 * Subscribes to `authStore.apiUserId` so token changes reconnect without wrapping the screen in `observer`.
 */
export function useFeedPostDetailRealtime(enabled: boolean): void {
  const queryClient = useQueryClient();
  const token = authStore.apiUserId;

  React.useEffect(() => {
    if (!enabled || !token) return;

    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let unmounted = false;

    const onMessage = (ev: MessageEvent) => {
      const raw = typeof ev.data === 'string' ? ev.data : String(ev.data);
      const parsed = tryParseServerMessage(raw);
      if (!parsed) return;
      if (parsed.type === 'ping') return;
      if (parsed.type === 'like_updated') {
        updatePostLikesCountInCaches(queryClient, parsed.postId, parsed.likesCount);
        return;
      }
      if (parsed.type === 'comment_added') {
        incrementPostCommentsCountInCaches(queryClient, parsed.postId);
        appendPostCommentFromRealtimeIfAllPagesLoaded(queryClient, parsed.postId, parsed.comment);
      }
    };

    const connect = () => {
      if (unmounted) return;
      const url = buildFeedRealtimeWebSocketUrl(token);
      ws = new WebSocket(url);
      ws.onmessage = onMessage;
      ws.onerror = () => {
        try {
          ws?.close();
        } catch {
          /* ignore */
        }
      };
      ws.onclose = () => {
        ws = null;
        if (unmounted) return;
        reconnectTimer = setTimeout(connect, RECONNECT_MS);
      };
    };

    connect();

    return () => {
      unmounted = true;
      if (reconnectTimer !== undefined) {
        clearTimeout(reconnectTimer);
      }
      try {
        ws?.close();
      } catch {
        /* ignore */
      }
    };
  }, [enabled, token, queryClient]);
}
