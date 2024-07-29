import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useNearestParkData = ({
  lat,
  lon,
  radius = 3,
}: {
  lat: number | string;
  lon: number | string;
  radius: number;
}) => {
  const fetchData = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API_URL
      }/nearest_parks?lat=${lat}&lon=${lon}&radius=${radius}`
    );
    return response?.data;
  };

  return useQuery({
    queryKey: ["nearestParkData"],
    queryFn: () => fetchData(),
    enabled: false,
  });
};

export const useSearchParkData = (query: string) => {
  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/search_parks?query=${query}`
    );
    return response?.data;
  };

  return useQuery({
    queryKey: ["searchParkData"],
    queryFn: () => fetchData(),
    enabled: false,
  });
};
