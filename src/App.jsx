
import { RouterProvider } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import routes from "./routes/routes.jsx";
import './styles/App.css'


function App() {
  return (
    <ProductProvider>
      <RouterProvider router={routes} />
    </ProductProvider>
  

  );
}

export default App;
