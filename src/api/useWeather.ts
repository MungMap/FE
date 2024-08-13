import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useWeatherData = (lat: any, lon: any) => {
  const fetchData = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_APP_WEATHER_API_KEY}&units=metric`
    );
    return response?.data;
  };

  return useQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetchData(),
    enabled: false,
  });
};
