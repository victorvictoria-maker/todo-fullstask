import useSWR from "swr";
import toast from "react-hot-toast";
import type { Todo } from "../lib/types";

interface FetchOptions {
  method?: string;
  body?: any;
}

const fetcher = (url: string, options: FetchOptions = {}) => {
  const { method = "GET", body } = options;

  return fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());
};

export const useTodos = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, error, mutate, isLoading } = useSWR(
    `${apiUrl}/todos/`,
    fetcher
  );

  const handleError = (error: string) => {
    toast.error(error);
    throw new Error(error);
  };

  const addTodo = async (title: string) => {
    const newTodo = {
      title: `${title} adding...`,
      _id: Date.now().toString(),
      isCompleted: false,
    };

    await mutate(
      async () => {
        const response = await fetcher(`${apiUrl}/todos/`, {
          method: "POST",
          body: { title },
        });
        if (response.error) handleError(response.error);
        return [...(data || []), response];
      },
      {
        optimisticData: [...(data || []), newTodo],
        revalidate: true,
        rollbackOnError: true,
      }
    );
  };

  const deleteTodo = async (id: string) => {
    await mutate(
      async () => {
        const response = await fetcher(`${apiUrl}/todos/${id}`, {
          method: "DELETE",
        });
        if (response.error) handleError(response.error);
        toast.success("Todo deleted!");
        return data?.filter((todo: Todo) => todo._id !== id);
      },
      {
        optimisticData: data?.filter((todo: Todo) => todo._id !== id),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  const toggleIsCompleted = async (id: string, isCompleted: boolean) => {
    await mutate(
      async () => {
        const response = await fetcher(`${apiUrl}/todos/${id}`, {
          method: "PUT",
          body: { isCompleted: !isCompleted },
        });
        if (response.error) handleError(response.error);
        return data?.map((todo: Todo) =>
          todo._id === id ? { ...todo, isCompleted: !isCompleted } : todo
        );
      },
      {
        optimisticData: data?.map((todo: Todo) =>
          todo._id === id ? { ...todo, isCompleted: !isCompleted } : todo
        ),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  const updateTodo = async (id: string, title: string) => {
    await mutate(
      async () => {
        const response = await fetcher(`${apiUrl}/todos/${id}`, {
          method: "PUT",
          body: { title },
        });
        if (response.error) handleError(response.error);
        return data?.map((todo: Todo) =>
          todo._id === id ? { ...todo, title } : todo
        );
      },
      {
        optimisticData: data?.map((todo: Todo) =>
          todo._id === id ? { ...todo, title } : todo
        ),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  return {
    data,
    error,
    isLoading,
    addTodo,
    deleteTodo,
    toggleIsCompleted,
    updateTodo,
  };
};
