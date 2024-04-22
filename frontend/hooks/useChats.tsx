import useSWR from "swr";
import axios from "@/lib/axiosInstance";

interface ChatMessage {
  senderUsername: string;
  content: string;
}

export interface Chat {
  chatId: number;
  lastMessage: ChatMessage;
}

interface Error {
  message: string;
}

export interface UseChatsReturn {
  chats: Chat[] | undefined;
  chatsAreLoading: boolean;
  chatsHasError: Error | undefined;
}

const fetcher = (url: string) => axios.get<Chat[]>(url).then((res) => res.data);

export function useChats(): UseChatsReturn {
  const { data, error, mutate } = useSWR<Chat[], Error>("/api/chats", fetcher);

  return {
    chats: data,
    chatsAreLoading: !error && !data,
    chatsHasError: error,
    mutate,
  };
}
