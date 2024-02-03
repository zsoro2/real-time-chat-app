import useSWR from "swr";
import axios, { AxiosError } from "axios";

interface User {
  id: number;
  username: string;
  email: string;
}

interface LoginError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

const fetcher = (url: string) => axios.get<User>(url).then((res) => res.data);

export function useUser() {
  const { data, mutate, error } = useSWR<User, AxiosError>(
    "/api/user",
    fetcher
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<User>("/api/login", {
        email,
        password,
      });
      mutate(response.data, false);
      return response.data;
    } catch (error: any) {
      const err = error as LoginError;
      throw new Error(err.response?.data?.error || "Login failed");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post<User>("/api/register", {
        username,
        email,
        password,
      });
      mutate(response.data, false);
      return response.data;
    } catch (error: any) {
      const err = error as LoginError;
      throw new Error(err.response?.data?.error || "Registration failed");
    }
  };

  return {
    user: data,
    isLoading: !error && !data,
    isError: !!error,
    login,
    register,
  };
}
