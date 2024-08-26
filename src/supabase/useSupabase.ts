import axios from "axios";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;

export interface ISearchParams {
  category: string;
  searchText?: string;
  page: number;
  pageSize: number;
}

export const fetchFilteredData = async (params: ISearchParams) => {
  const { category, searchText, page, pageSize } = params;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  const filterQuery = `and=(category.ilike.*${category}*,address.ilike.*${searchText}*)&limit=${limit}&offset=${offset}`;
  const response = await axios.get(
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
};
