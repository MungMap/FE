import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
