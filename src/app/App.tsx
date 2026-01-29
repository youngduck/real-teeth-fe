import { HelmetProvider } from "react-helmet-async";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@shared/lib/react-query";
import { Router } from "@app/router/router";

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
