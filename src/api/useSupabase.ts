import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
const supabaseJWT = import.meta.env.VITE_APP_SUPABASE_JWT;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const tokenString = localStorage.getItem("sb-gzmgdpstnvnvyeyhoppc-auth-token");
const access_token = tokenString ? JSON.parse(tokenString).access_token : null;

export interface ISearchParams {
  category: string;
  searchText?: string;
  page: number;
  pageSize: number;
}

export interface IMedicalParams {
  lat: any;
  lng: any;
  searchText?: any;
  radius: any;
  param: any;
}

export const useSearchData = (params: ISearchParams) => {
  const { category, searchText, page, pageSize } = params;
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
};

export const useInfoSearchData = (params: ISearchParams) => {
  const { category, searchText, page, pageSize } = params;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  const filterQuery = `and=(info.ilike.*${category}*,address.ilike.*${searchText}*)&limit=${limit}&offset=${offset}`;
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
};

export const useNearMedicalData = async (params: IMedicalParams) => {
  const { lat, lng, radius, param } = params;

  const response = await axios.post(
    `${supabaseUrl}/rest/v1/rpc/find_medical_within_radius`,
    {
      radius_km: Number(radius),
      user_lat: Number(lat),
      user_lon: Number(lng),
      user_param: param,
    },
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

export const useNearWalkData = async (params: IMedicalParams) => {
  const { lat, lng, radius, param } = params;

  const response = await axios.post(
    `${supabaseUrl}/rest/v1/rpc/find_walk_within_radius`,
    {
      radius_km: Number(radius),
      user_lat: Number(lat),
      user_lon: Number(lng),
      user_param: param,
    },
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
