import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
const supabaseJWT = import.meta.env.VITE_APP_SUPABASE_JWT;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const tokenString = localStorage.getItem("sb-gzmgdpstnvnvyeyhoppc-auth-token");
const access_token = tokenString ? JSON.parse(tokenString).access_token : null;

export interface ILikeParams {
  userId: any;
  placeId?: any;
  type?: string;
}

export const useSaveFavorite = async (params: ILikeParams) => {
  const { userId, placeId, type } = params;
  const { data, error } = await supabase.rpc("add_to_favorites", {
    p_user_id: userId.toString(),
    p_place_id: Number(placeId),
    p_type: type,
  });
  if (error) {
    console.error("찜하기 추가 중 오류 발생:", error.message);
  } else {
    console.log("찜하기가 성공적으로 추가되었습니다:", data);
  }
};

export const useGetFavorite = async (params: ILikeParams) => {
  const { userId, type } = params;
  try {
    const response = await axios.post(
      `${supabaseUrl}/rest/v1/rpc/get_user_favorites`,
      {
        p_user_id: userId.toString(),
        p_type: type,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${serviceRoleKey}`,
          apikey: serviceRoleKey,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("요청 중 오류 발생:", err);
    return null;
  }
};
