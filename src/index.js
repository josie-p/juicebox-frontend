import React from "react";
import ReactDOM from "react-dom/client";
import { Main, HomePage, LogIn, Register, SinglePost, NewPost, EditPost } from "./components";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Main/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/posts/:id" element={<SinglePost/>}/>
            <Route path="/newpost" element={<NewPost/>}/>
            <Route path="/post/edit/:id" element={<EditPost/>}/>
        </Route>
    )
);

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(<RouterProvider router={router}/>);
