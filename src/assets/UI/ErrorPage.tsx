import { useNavigate } from "react-router-dom";
import error from "../error.png";
export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex gap-4 flex-col items-center justify-center">
      <div className="size-70">
        <img src={error} alt="" />
      </div>
      <p>Internet connection is probably down</p>
      <button className="menu-btn bg-green-800" onClick={() => navigate(0)}>
        Reload?
      </button>
    </div>
  );
}
