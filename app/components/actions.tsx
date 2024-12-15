import {
  faHourglass,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { Timer } from "./timer";
import React, { useState } from "react";
import { ETeam } from "~/dtos/dtos";
import { getStoredValue, setStoredValues } from "~/utils/utils";

interface ActionsProps {
  setCount: (value: (prev: number) => number) => void;
  isReset: boolean;
  team: ETeam;
  isOneTimerActive: boolean;
  setIsOneTimerActive: (value: boolean) => void;
}

export function Actions({
  setCount,
  isReset,
  team,
  isOneTimerActive,
  setIsOneTimerActive,
}: ActionsProps) {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isFirstTimerTriggered, setIsFirstTimerTriggered] =
    useState<boolean>(false);
  const [isSecondTimerTriggered, setIsSecondTimerTriggered] =
    useState<boolean>(false);

  const handleTimerReset = React.useCallback(() => {
    setIsFirstTimerTriggered(false);
    setIsSecondTimerTriggered(false);
    setStoredValues(`isFirstTimerTriggered ${team}`, false);
    setStoredValues(`isSecondTimerTriggered ${team}`, false);
    setIsTimerActive(false);
  }, [team]);

  React.useEffect(() => {
    isReset && handleTimerReset();
  }, [isReset, handleTimerReset]);

  React.useEffect(() => {
    isFirstTimerTriggered !== false &&
      setStoredValues(`isFirstTimerTriggered ${team}`, isFirstTimerTriggered);
    isSecondTimerTriggered !== false &&
      setStoredValues(`isSecondTimerTriggered ${team}`, isSecondTimerTriggered);
  }, [isFirstTimerTriggered, isSecondTimerTriggered, team]);

  React.useLayoutEffect(() => {
    const isFirstTimerTriggered = getStoredValue(
      `isFirstTimerTriggered ${team}`,
      false
    );
    const isSecondTimerTriggered = getStoredValue(
      `isSecondTimerTriggered ${team}`,
      false
    );
    setIsFirstTimerTriggered(isFirstTimerTriggered);
    setIsSecondTimerTriggered(isSecondTimerTriggered);
  }, [isFirstTimerTriggered, isSecondTimerTriggered, team]);

  return (
    <>
      <div className="flex justify-between mt-2 w-32 md:w-40 ">
        <Button
          className="w-1/4 bg-transparent min-w-0 text-[#fff]"
          onClick={() =>
            setCount((prev: number) => (prev > 0 ? prev - 1 : prev))
          }
        >
          <FontAwesomeIcon
            icon={faSquareMinus}
            className="w-4 h-4 sm:w-5 sm:h-5 m-auto"
          />
        </Button>

        <Button
          className="w-1/4 bg-transparent min-w-0"
          isDisabled={isFirstTimerTriggered}
          disabled={isTimerActive || isOneTimerActive}
        >
          <FontAwesomeIcon
            icon={faHourglass}
            color="white"
            className="w-4 h-4 sm:w-5 sm:h-5 m-auto"
            onClick={() => {
              setIsTimerActive(true);
              setIsOneTimerActive(true);
              setIsFirstTimerTriggered(true);
            }}
          />
        </Button>
        <Button
          className="w-1/4 bg-transparent min-w-0"
          isDisabled={isSecondTimerTriggered}
          disabled={isTimerActive || isOneTimerActive}
        >
          <FontAwesomeIcon
            icon={faHourglass}
            color="white"
            className="w-4 h-4 sm:w-5 sm:h-5 m-auto"
            onClick={() => {
              setIsTimerActive(true);
              setIsOneTimerActive(true);
              setIsSecondTimerTriggered(true);
            }}
          />
        </Button>
        <div className="w-1/4">
          {isTimerActive && (
            <Timer
              isTimerActive={isTimerActive}
              setIsTimerActive={setIsTimerActive}
              setIsOneTimerActive={setIsOneTimerActive}
            />
          )}
        </div>
      </div>
    </>
  );
}
