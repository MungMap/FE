import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;

export interface ISearchParams {
  category: string;
  searchText?: string;
  page: number;
  pageSize: number;
}

export const useSearchData = (params: ISearchParams) => {
  const { category, searchText, page, pageSize } = params;
  console.log("page", page);
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  const filterQuery = `and=(category.ilike.*${category}*,address.ilike.*${searchText}*)&limit=${limit}&offset=${offset}`;
  const response = axios.get(
    `${supabaseUrl}/rest/v1/petAllowed?select=*&${filterQuery}`,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
      },
    }
  );
  return response;

  // const fetchData = async () => {
  //   const response = await axios.get(
  //     `${supabaseUrl}/rest/v1/petAllowed?select=*&${filterQuery}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json;charset=UTF-8",
  //         Authorization: `Bearer ${serviceRoleKey}`,
  //         apikey: serviceRoleKey,
  //       },
  //     }
  //   );
  //   return response?.data;
  // };

  // return useQuery({
  //   queryKey: ["searchListData", params],
  //   queryFn: () => fetchData(),
  //   enabled: false,
  // });
};
