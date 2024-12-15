import { useState, useEffect } from "react";

interface TimerProps {
  isTimerActive: boolean;
  setIsTimerActive: (value: boolean) => void;
  setIsOneTimerActive: (value: boolean) => void;
}

export function Timer({
  isTimerActive,
  setIsTimerActive,
  setIsOneTimerActive,
}: TimerProps) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (isTimerActive && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsTimerActive(false);
      setIsOneTimerActive(false);
      setSeconds(30);
    }

    return () => clearInterval(timerId);
  }, [isTimerActive, seconds, setIsTimerActive, setIsOneTimerActive]);

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-xl mt-[0.4rem] sm:mt-0 sm:text-3xl text-[#fff]">
        {seconds}
      </h1>
    </div>
  );
}
