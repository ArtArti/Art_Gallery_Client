import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UploadView from "./components/Upload/UploadView";
import CartView from "./components/Cart/ShoppingCart";
import ArtGalleryWrapper from "./components/Gallery/ArtGalleryWrapper";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import AuthForm from "./Authentication/AuthForm";
// import ForgotPassword from './Profile/ForgotPassword'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ArtGalleryWrapper />,
      },
      {
        path: "/upload",
        element: <UploadView />
        ,
      },
      {
        path: "/cart",
        element: <CartView/>,
      },
       {
        path: "/about",
        element: <About/>,
      },
       {
        path: "/contact",
        element: <Contact/>,
      },
       {
        path: "/auth",
        element: <AuthForm/>,
      },
      // {
      //   path: "/forgotpass",
      //   element: <ForgotPassword/>,
      // },
    ],
  },
]);

export default router;
