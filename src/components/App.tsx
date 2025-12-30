import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createHashRouter,
} from "react-router-dom";
import Home from "../Pages/Home";
import General from "../Pages/General";
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import Page404 from "../Pages/Page404";
import Animal from "../Pages/Animal";
import History from "../Pages/History";
import Science from "../Pages/Science";
import Game from "../Pages/Games";
import Leaderboard from "../Pages/Leaderboard";

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/general" element={<General />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/history" element={<History />} />
        <Route path="/science" element={<Science />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Page404 />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
