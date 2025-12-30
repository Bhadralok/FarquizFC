import logo from "../../assets/quiz.png";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-28 flex items-center justify-center">
        <img src={logo} alt="" className="" />
      </div>
      <h1 className="font-bold">Loading...</h1>
    </div>
  );
}
