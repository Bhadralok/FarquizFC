import { useNavigate } from "react-router-dom";
import page404 from "../assets/page404.png";
export default function Page404() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex gap-4 flex-col items-center justify-center">
      <div className="size-70">
        <img src={page404} alt="" />
      </div>
      <p>uhh...page not found</p>
      <button className="menu-btn bg-green-800" onClick={() => navigate("/")}>
        Go home
      </button>
    </div>
  );
}
