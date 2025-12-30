import comingSoonBunny from "../assets/comingSoonBunny.png";
import { useNavigate } from "react-router-dom";
export default function Leaderboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 items-center h-screen font-bold justify-center">
      <div className="w-40 relative right-5">
        <img src={comingSoonBunny} alt="" />
      </div>
      <p className="text-sm text-black/50">
        Leaderboard feature is under development.
      </p>
      <button onClick={() => navigate("/")} className="menu-btn bg-general">Go home</button>
    </div>
  );
}
