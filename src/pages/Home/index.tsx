import { useEffect, useState } from "react";

import { apiClient } from "@/services";
import { SeriesType } from "@/types";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState<SeriesType[]>([] as SeriesType[]);

  const fetchSeries = async () => {
    setIsLoading(true);
    const response = await apiClient
      .get<SeriesType[]>("/series")
      .then((response) => {
        if (response.status === 200) {
          setSeries(response.data);
        }
      })
      .catch(() => {
        console.error("error");
      })
      .finally(() => setIsLoading(false));

    return response;
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {series.map((serie) => (
        <h1 key={serie.id}>{serie.name}</h1>
      ))}
    </>
  );
}

export { Home };
