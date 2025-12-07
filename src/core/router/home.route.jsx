import MainLayout from "../../view/layout/MainLayout";
import MainHome from "../../view/page/MainHome";


export const homeroute = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MainHome /> },
      { path: "home", element: <MainHome /> },
    ],
  },
];
