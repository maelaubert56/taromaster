import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

import Home from "./pages/Home/Home.js";
import MenuPartie from "./pages/MenuPartie/MenuPartie.js";
import Partie from "./pages/Partie/Partie.js";
import Account from "./pages/Account/Account.js";
import Rules from "./pages/Rules/Rules.js";
import Join from './pages/Join/Join.js';
import AdminPannel from "./pages/AdminPannel/AdminPannel.js";
import DesktopError from "./pages/DesktopError/DesktopError.js";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },{
        path: "/parties",
        element: <MenuPartie/>,
    },{
        path: "/partie",
        element: <Partie/>,
    },{
        path: "/partie/:id",
        element: <Partie/>,
    },{
        path: "/account",
        element: <Account/>,
    },{
        path: "/rules",
        element: <Rules/>
    },{
        path:"/join/:max_date/:id_partie",
        element: <Join />
    },{
        path:"/admin",
        element: <AdminPannel />
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        {window.innerWidth > 600 ? <DesktopError /> :
        <RouterProvider router={router} />
        }
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();