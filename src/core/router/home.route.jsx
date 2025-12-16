import MainLayout from "../../view/layout/MainLayout";
import CakeCard from "../../view/page/Cake";
import MainHome from "../../view/page/MainHome";
import MobileDashboard from "../../view/page/MobileMenu";
import BirthdayCard from "../../view/page/Second";
import TicTacToe from "../../view/page/TacTicTo";
import RomanticCamera from "../../view/page/Camera";


export const homeroute = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MainHome /> },
      { path: "home", element: <MainHome /> },
      { path: "cake", element: <CakeCard /> },
      { path: "success", element: <BirthdayCard /> },
      { path: "ttc", element: <TicTacToe /> },
      { path: "camera", element: <RomanticCamera /> },
      { path: "menu", element: <MobileDashboard /> },
    ],
  },
];
