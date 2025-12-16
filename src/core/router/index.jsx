import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { homeroute } from "./home.route";

export const router = createHashRouter([...homeroute]);
