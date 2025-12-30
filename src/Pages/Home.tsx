"use client";
import general from "../assets/General.png";
import animal from "../assets/animals.png";
import history from "../assets/History.png";
import science from "../assets/science.png";
import game from "../assets/Game.png";
import { useMiniApp } from "@neynar/react";
import { Header } from "~/components/ui/Header";

import { USE_WALLET } from "~/lib/constants";
import { useNeynarUser } from "../hooks/useNeynarUser";
import { useRouter } from "next/navigation";

// --- Types ---
export enum Tab {
  Home = "home",
  Actions = "actions",
  Context = "context",
  Wallet = "wallet",
}

export interface AppProps {
  title?: string;
}

export default function App(
  { title }: AppProps = { title: "Neynar Starter Kit" }
) {
  // --- Hooks ---
  const { isSDKLoaded, context, setInitialTab, setActiveTab, currentTab } =
    useMiniApp();
  const router = useRouter();
  const { user: neynarUser } = useNeynarUser(context || undefined);


  if (!isSDKLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner h-8 w-8 mx-auto mb-4"></div>
          <p className="text-white">Loading SDK...</p>
        </div>
      </div>
    );
  }

  // --- Render ---
  return (
    <div>
      {/* Header should be full width */}
      <Header neynarUser={neynarUser} />

      {/* Main content and footer should be centered */}
      <div className="h-full w-screen flex-col gap-3.5 flex items-center justify-center">
        <p className="font-bold text-sm">Pick a quiz topic</p>
        <button
          onClick={() => router.push("/general")}
          className="menu-btn bg-general"
          style={{ backgroundImage: `url(${general})` }}
        >
          <h2>General knowledge</h2>
        </button>
        <button
          onClick={() => router.push("/animal")}
          className="menu-btn bg-animal "
          style={{ backgroundImage: `url(${animal})` }}
        >
          <h2>Animals</h2>
        </button>
        <button
          className="menu-btn bg-history  "
          onClick={() => router.push("/history")}
          style={{ backgroundImage: `url(${history})` }}
        >
          <h2 className="text-history-text">History</h2>
        </button>
        <button
          onClick={() => router.push("/science")}
          className="menu-btn bg-science  "
          style={{ backgroundImage: `url(${science})` }}
        >
          <h2 className="">Science</h2>
        </button>
        <button
          onClick={() => router.push("/game")}
          className="menu-btn bg-game  "
          style={{ backgroundImage: `url(${game})` }}
        >
          <h2 className="">Video Games</h2>
        </button>
      </div>
      <div className="flex flex-col gap-2 items-center ">
        <button
          className="menu-btn bg-black"
          onClick={() => router.push("/leaderboard")}
        >
          Leaderboard
        </button>
        <button className="menu-btn bg-black">Add Miniapp</button>

        <p className="font-bold text-[12px] text-black/40">
          built by Bhadralok
        </p>
      </div>
    </div>
  );
}
