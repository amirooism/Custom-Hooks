import { useEffect, useState } from "react";

export function useFetch(fetchFn , initialvalue) {
  //function start with "use" treated as hooks :)

  const [fetchedData, setFetchedData] = useState(initialvalue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);
  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
