import "./index.css";
import { RouterProvider } from "react-router-dom";
import { root } from "./root";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClinet = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <AuthProvider
    authType="cookie"
    authName="register_auth_token"
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}
  >
    <QueryClientProvider client={queryClinet}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <RouterProvider router={root} />
      </Provider>
    </QueryClientProvider>
  </AuthProvider>
);
