import {
  IoClose,
  IoChevronBackSharp,
  IoChevronForwardSharp,
} from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import he from "he";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type SummaryProps = {
  questions: string[];
  correctAnswers: string[];
  PickedOption: string[];
  onClose: () => void;
  accentColor?: string;
  accentColorText?: string;
};

export default function Summary({
  questions,
  correctAnswers,
  PickedOption,
  onClose,
  accentColor = "bg-general",
  accentColorText = "text-general",
}: SummaryProps) {
  // const [counter, setCounter] = useState<number>(0);
  const navigate = useNavigate();

  const isCorrect = (index) => {
    // setCounter((n) => n++);
    if (correctAnswers[index] === PickedOption[index]) {
      const style = "text-green-600";
      return style;
    } else {
      const style = "text-red-600";
      return style;
    }
  };
  // console.log(counter);
  return (
    <div className="flex pt-10 overflow-y-scroll scrollbar-hide gap-5 pb-10 h-screen w-full flex-col px-5 items-center">
      <header className="flex pb-5 items-center w-full justify-between">
        <div
          className="size-8 outline-2 rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          <IoClose size={24} />
        </div>
        <p className="font-bold">Summary</p>
        <div>
          <GiHamburgerMenu size={24} color="white" />
        </div>
      </header>

      {questions.map((question, index) => (
        <div key={index} className="flex w-full items-center gap-2">
          <div className={`min-w-1 ${accentColor} h-full`}></div>
          <div>
            <p>{he.decode(question)}</p>
            <p className={`font-bold `}>
              <span className={`${accentColorText} `}>Answer: </span>
              {he.decode(correctAnswers[index])}
            </p>
            <p className={`font-bold ${isCorrect(index)}`}>
              <span className={`${accentColorText}`}>You Selected: </span>
              {he.decode(PickedOption[index])}
            </p>
          </div>
        </div>
      ))}

      <div className="pb-10 w-full flex flex-col gap-4">
        <button
          onClick={() => navigate(0)}
          className="flex items-center justify-between px-10 w-full min-h-[52px] gap-2 outline-2 outline-black font-bold rounded-full"
        >
          <IoChevronBackSharp /> Restart the quiz
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-between px-10 w-full min-h-[52px] gap-2 bg-answer font-bold text-white rounded-full"
        >
          Change quiz topic
          <IoChevronForwardSharp />
        </button>
      </div>
    </div>
  );
}
