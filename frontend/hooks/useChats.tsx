import useSWR from "swr";
import axios from "@/lib/axiosInstance";
import { ApiPaginationResponse } from "@/types/apiResponseTypes";
import { Chat, UseChatsReturn } from "@/types/chatTypes";

interface Error {
  message: string;
}

const fetcher = (url: string) => axios.get<Chat[]>(url).then((res) => res.data);

export function useChats(): UseChatsReturn {
  const { data, error, mutate } = useSWR<ApiPaginationResponse<Chat[]>, Error>(
    "/api/chats",
    fetcher
  );

  return {
    chats: data,
    chatsAreLoading: !error && !data,
    chatsHasError: error,
    mutate,
  };
}
