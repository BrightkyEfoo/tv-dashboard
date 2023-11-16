import { router } from "Routing";
import { store } from "Store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./Global.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
