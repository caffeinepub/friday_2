import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Message, UserPreferences, UserProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetConversationHistory(page: number = 0, pageSize: number = 50) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Message[]>({
    queryKey: ['conversationHistory', page, pageSize],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversationHistory(BigInt(page), BigInt(pageSize));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: Message) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveMessage(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversationHistory'] });
    },
  });
}

export function useGetPreferences() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserPreferences | null>({
    queryKey: ['preferences'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPreferences();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSavePreferences() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: UserPreferences) => {
      if (!actor) throw new Error('Actor not available');
      return actor.savePreferences(preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });
}

export function useClearHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.clearHistory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversationHistory'] });
    },
  });
}
