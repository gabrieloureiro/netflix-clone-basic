import { useEffect, useState } from "react";

import { Layout } from "@/components";
import { apiClient } from "@/services";
import { SeriesType } from "@/types";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [series, setSeries] = useState<SeriesType[]>([] as SeriesType[]);
  const [selectedSeries, setSelectedSeries] = useState<SeriesType[]>(
    [] as SeriesType[],
  );

  const bestRatingSerie = series.find(
    (serie) => serie.rating === Math.max(...series.map((s) => s.rating)),
  );

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

  const handleSelectSerie = (serie: SeriesType) => {
    if (selectedSeries.includes(serie)) {
      setSelectedSeries((prevState) =>
        prevState.filter((s) => s.id !== serie.id),
      );
    } else {
      setSelectedSeries((prevState) => [...prevState, serie]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await apiClient.post("/series/favorites", selectedSeries).then((res) => {
      if (res.status === 201) {
        console.log("toast", "sucesso ao criar menu de series favoritas");
      }
    });
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout className="relative">
      <div
        className="flex min-h-[calc(100%-56px)] flex-1 flex-col justify-center bg-slate-300 bg-cover px-14"
        style={{
          backgroundImage: `url(${bestRatingSerie?.image})`,
        }}
      >
        <h2 className="pb-4 text-2xl font-bold">{bestRatingSerie?.name}</h2>
        <p className="max-w-md">{bestRatingSerie?.description}</p>
      </div>
      <div className="absolute bottom-1 flex flex-col px-14">
        <p className="px-1 pb-4 text-lg font-medium">Em alta</p>
        <div className="flex items-center">
          {series.map((serie) => (
            <img
              onClick={() => handleSelectSerie(serie)}
              className="flex max-h-[112px] w-[200px] flex-1 rounded-md px-1"
              key={serie.id}
              src={serie.image}
              alt={serie.name}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export { Home };
