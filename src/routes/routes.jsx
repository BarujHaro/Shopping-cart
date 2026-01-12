import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layout/MainLayout";


const routes = createBrowserRouter([
    {
        element : <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrorPage />,
            },
            {
                path: "shop/",
                element: <Shop />,
            },
            {
                path: "cart/",
                element: <Cart />,
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    }


]);

export default routes;