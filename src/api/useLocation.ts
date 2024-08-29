import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useLocationData = (address: string) => {
  const fetchData = async () => {
    const response = await axios.get(
      `https://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${address}
&refine=true&simple=false&format=xml&type=road&key=${import.meta.env.VITE_APP_VWORLD_API_KEY}`
    );
    return response?.data;
  };

  return useQuery({
    queryKey: ["locationData"],
    queryFn: () => fetchData(),
    enabled: false,
  });
};
