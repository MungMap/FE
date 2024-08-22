import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./SupabaseClient";

interface SupabaseProviderProp {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProp> = ({ children }) => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
