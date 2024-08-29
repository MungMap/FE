import Router from "./Router";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SupabaseProvider from "./utils/SupabaseProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <SupabaseProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </SupabaseProvider>
  );
}

export default App;
