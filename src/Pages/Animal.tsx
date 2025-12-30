import { useQuery } from "@tanstack/react-query";
import Loading from "../assets/UI/Loading";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoClose,
} from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import bunny from "../assets/bunny.png";
import he from "he";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../assets/UI/ErrorPage";
import Summary from "../assets/UI/Summary";
import Animation from "../assets/UI/Animation";

export default function General() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectAnswer, setSelectAnswer] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(10).fill(null)
  );
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedTexts, setSelectedTexts] = useState<string[]>(
    Array(10).fill("")
  );
  const [direction, setDirection] = useState<number>(1);

  const [styles, setStyles] = useState({
    style1: defaultStyle,
    style2: defaultStyle,
    style3: defaultStyle,
    style4: defaultStyle,
  });

  const [nextIndex, setNextIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const handleSelect = (
    selected: "style1" | "style2" | "style3" | "style4"
  ) => {
    const styleMap = {
      style1: 0,
      style2: 1,
      style3: 2,
      style4: 3,
    };

    const index = styleMap[selected];
    setSelectedOption(index);

    // Save selected answer for this question
    const updated = [...answers];
    updated[nextIndex] = index;
    setAnswers(updated);

    setStyles({
      style1: selected === "style1" ? selectedStyle : defaultStyle,
      style2: selected === "style2" ? selectedStyle : defaultStyle,
      style3: selected === "style3" ? selectedStyle : defaultStyle,
      style4: selected === "style4" ? selectedStyle : defaultStyle,
    });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (!data) return;

    const newOptions = [
      data.results[nextIndex].correct_answer,
      data.results[nextIndex].incorrect_answers[0],
      data.results[nextIndex].incorrect_answers[1],
      data.results[nextIndex].incorrect_answers[2],
    ];
    setOptions(newOptions.sort(() => Math.random() - 0.5));

    // 🔥 Restore saved answer when question changes
    const saved = answers[nextIndex];
    setSelectedOption(saved);

    setStyles({
      style1: saved === 0 ? selectedStyle : defaultStyle,
      style2: saved === 1 ? selectedStyle : defaultStyle,
      style3: saved === 2 ? selectedStyle : defaultStyle,
      style4: saved === 3 ? selectedStyle : defaultStyle,
    });
  }, [data?.results, nextIndex]);

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <Loading />
      </div>
    );

  if (error) return <ErrorPage />;

  const bars = Array.from({ length: 10 }, (_, i) => i);

  const handleNext = () => {
    setDirection(1);
    setQuestions((prev) => {
      const currentQuestion = data.results[nextIndex].question;

      if (prev.includes(currentQuestion)) return prev;

      return [...prev, currentQuestion];
    });
    setCorrectAnswers((prev) => {
      const currentAnswer = data.results[nextIndex].correct_answer;
      if (prev.includes(currentAnswer)) return prev;

      return [...prev, currentAnswer];
    });

    setSelectedTexts((prev) => {
      const updated = [...prev];
      const selectedText = options[selectedOption!];
      updated[nextIndex] = selectedText;
      return updated;
    });

    if (selectedOption === null) {
      setSelectAnswer(true);
      return;
    }
    console.log(questions);

    if (nextIndex === 9) {
      setSubmitted(true);
      return;
    }

    if (nextIndex === 10) return;
    setNextIndex(nextIndex + 1);
    setActiveIndex(activeIndex + 1);
    setSelectAnswer(false);
  };
  const onClose = () => navigate("/");

  // const allAnswered = answers.every((a) => a !== null);

  const handlePrev = () => {
    setDirection(-1);
    if (nextIndex === 0) return;
    setNextIndex(nextIndex - 1);
    setActiveIndex(activeIndex - 1);
  };

  return (
    <>
      {!submitted ? (
        <div className="bg-animal-background">
          <Animation currentIndex={nextIndex} NextDirection={direction}>
            <div className="flex h-screen w-screen flex-col px-5 pt-5 bg-animal-background overflow-y-scroll scrollbar-hide">
              <header className="flex items-center justify-between">
                <div
                  className="size-8 outline-2 outline-white rounded-full flex items-center justify-center"
                  onClick={onClose}
                >
                  <IoClose size={24} color="white" />
                </div>
                <p className="text-white font-bold">
                  {data.results[0].category}
                </p>
                <div className="">
                  <GiHamburgerMenu size={24} color="white" />
                </div>
              </header>

              <div className="text-white font-bold pt-5">
                <div className="flex justify-between items-center">
                  <p>Question {activeIndex + 1} </p>
                  <p>{activeIndex + 1} of 10</p>
                </div>

                <div className="flex gap-1.5 items-center justify-center pt-1.5">
                  {bars.map((bar, i) => (
                    <div
                      key={i}
                      // onClick={() => handleClick(i)}
                      className={`w-full h-3  cursor-pointer rounded ${
                        activeIndex === i
                          ? "outline-2 outline-black bg-white"
                          : "bg-black/30"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="py-6">
                <img src={bunny} alt="" />
              </div>

              <div className="text-white pb-11">
                <h1 className="text-3xl leading-none font-bold flex wrap-break-word flex-wrap">
                  {he.decode(data?.results[nextIndex].question)}
                </h1>
              </div>

              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-white font-bold tracking-wider">
                    Choose your answer
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      className={styles.style1}
                      onClick={() => handleSelect("style1")}
                    >
                      A. {options[0] && he.decode(options[0])}
                    </button>

                    <button
                      className={styles.style2}
                      onClick={() => handleSelect("style2")}
                    >
                      B. {options[1] && he.decode(options[1])}
                    </button>

                    <button
                      className={styles.style3}
                      onClick={() => handleSelect("style3")}
                    >
                      C. {options[2] && he.decode(options[2])}
                    </button>

                    <button
                      className={styles.style4}
                      onClick={() => handleSelect("style4")}
                    >
                      D. {options[3] && he.decode(options[3])}
                    </button>
                  </div>

                  {selectAnswer && (
                    <p className="text-white pt-2 pl-2 text-sm">
                      Please pick an option
                    </p>
                  )}
                </div>

                <div className="pt-10 flex gap-4 items-center justify-center flex-wrap w-full pb-10 px-10 text-xl">
                  {nextIndex === 9 ? (
                    <>
                      <button className="prev-btn" onClick={handlePrev}>
                        <IoChevronBackSharp />
                        Previous
                      </button>

                      <button className="submit-btn" onClick={handleNext}>
                        Submit
                        <IoChevronForwardSharp />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="prev-btn" onClick={handlePrev}>
                        <IoChevronBackSharp />
                        Previous
                      </button>

                      <button className="next-btn" onClick={handleNext}>
                        Next
                        <IoChevronForwardSharp />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Animation>
        </div>
      ) : (
        <Summary
          questions={questions}
          correctAnswers={correctAnswers}
          onClose={onClose}
          accentColor="bg-animal"
          accentColorText="text-animal"
          PickedOption={selectedTexts}
        />
      )}
    </>
  );
}

const defaultStyle =
  "@apply h-[52px] w-full px-8 bg-white py-2 font-medium flex justify-start text-2xl items-center rounded-full gap-2";

const selectedStyle =
  "@apply h-[52px] w-full bg-selected py-2 outline-2 font-bold px-8 rounded-full justify-start flex items-center text-2xl outline-black gap-2";
