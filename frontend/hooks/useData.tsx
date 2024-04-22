import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { UserPagination } from "@/types/userTypes";
import { AxiosReponse } from "axios";

interface ReturnValues {
  data: UserPagination;
  loading: boolean;
  error: string | null;
}

/* This is just an example for an custom api hook without SWR */
function useData(url: string): ReturnValues {
  const [data, setData] = useState<UserPagination>({
    data: [],
    page: 1,
    total: 0,
    last_page: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    axiosInstance
      .get(url, {
        signal: controller.signal,
      })
      .then(function (response: AxiosReponse<UserPagination>) {
        if (!ignore) {
          if (response.data) {
            setData(response.data);
            // if (data.page < response.data.page) {
            //   const mergedData = {
            //     ...response.data,
            //     data: [...data.data, ...response.data.data],
            //   };
            //   setData(mergedData);
            // } else {
            //   setData(response.data);
            // }
          }
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || "An unknown error occurred");
        }
      })
      .finally(() => {
        if (!ignore) {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      });
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useData;
