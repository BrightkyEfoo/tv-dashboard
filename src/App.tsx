import { router } from "Routing";
import { store } from "Store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./Global.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
