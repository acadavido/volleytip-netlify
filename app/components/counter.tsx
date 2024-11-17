import React from "react";
import { useState } from "react";
import { Set } from "../components/set";
import { Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { ETeam, SetDto } from "~/dtos/dtos";
import { Actions } from "~/components/actions";
import { getStoredValue, setStoredValues } from "~/utils/utils";
import CustomModal from "./custom-modal";
React.useLayoutEffect = React.useEffect;

export default function Counter() {
  const [localCount, setLocalCount] = useState(0);

  const [visitorCount, setVisitorCount] = useState(0);

  const [localSetCount, setLocalSetCount] = useState(0);

  const [visitorSetCount, setVisitorSetCount] = useState(0);

  const [setsFinished, setSetsFinished] = useState<SetDto[]>([]);

  const [lastPressed, setLastPressed] = useState<ETeam>();

  const [isReset, setIsReset] = useState(false);

  const [isFinishedBefore, setIsFinishedBefore] = useState<boolean>(false);
  const [teamWinnerFinishedBefore, setTeamWinnerFinishedBefore] =
    useState<ETeam>();

  const {
    isOpen: isSetModalOpen,
    onOpen: onSetModalOpen,
    onOpenChange: onSetModalOpenChange,
    onClose: onSetModalClose,
  } = useDisclosure();
  const {
    isOpen: isResetModalOpen,
    onOpen: onResetModalOpen,
    onOpenChange: onResetModalOpenChange,
    onClose: onResetModalClose,
  } = useDisclosure();

  React.useEffect(() => {
    localCount !== 0 && setStoredValues("localCount", localCount);
    visitorCount !== 0 && setStoredValues("visitorCount", visitorCount);
    localSetCount !== 0 && setStoredValues("localSetCount", localSetCount);
    visitorSetCount !== 0 &&
      setStoredValues("visitorSetCount", visitorSetCount);
    setsFinished.length > 0 && setStoredValues("setsFinished", setsFinished);
  }, [localCount, visitorCount, localSetCount, visitorSetCount, setsFinished]);

  React.useLayoutEffect(() => {
    const localCount = getStoredValue("localCount", 0);
    const visitorCount = getStoredValue("visitorCount", 0);
    const localSetCount = getStoredValue("localSetCount", 0);
    const visitorSetCount = getStoredValue("visitorSetCount", 0);
    const setsFinished = getStoredValue("setsFinished", []);
    setLocalCount(localCount);
    setVisitorCount(visitorCount);
    setLocalSetCount(localSetCount);
    setVisitorSetCount(visitorSetCount);
    setSetsFinished(setsFinished);
  }, []);

  const incrementCount = (team: ETeam) => {
    if (team === ETeam.VISITOR) {
      if (
        visitorCount < 25 ||
        (visitorCount >= 25 && Math.abs(visitorCount - localCount) <= 1)
      ) {
        setVisitorCount(visitorCount + 1);
        setLastPressed(ETeam.VISITOR);
        setIsFinishedBefore(false);
        if (visitorCount >= 24 && visitorCount - localCount >= 1) {
          onSetModalOpen();
        }
      }
    } else if (team === ETeam.LOCAL) {
      if (
        localCount < 25 ||
        (localCount >= 25 && Math.abs(visitorCount - localCount) <= 1)
      ) {
        setLocalCount(localCount + 1);
        setLastPressed(ETeam.LOCAL);
        setIsFinishedBefore(false);
        if (localCount >= 24 && localCount - visitorCount >= 1) {
          onSetModalOpen();
        }
      }
    }
  };

  const handleFinishedSet = () => {
    if (!isFinishedBefore) {
      if (lastPressed === ETeam.VISITOR) {
        setVisitorSetCount(visitorSetCount + 1);
      } else if (lastPressed === ETeam.LOCAL) {
        setLocalSetCount(localSetCount + 1);
      }
    }
    setSetsFinished([
      ...setsFinished,
      {
        local: localCount,
        visitor: visitorCount,
      },
    ]);
    setVisitorCount(0);
    setLocalCount(0);
    setIsFinishedBefore(false);
  };
  const handleNotFinishedSet = () => {
    if (!isFinishedBefore) {
      if (lastPressed === ETeam.VISITOR) {
        setVisitorCount(visitorCount - 1);
      } else if (lastPressed === ETeam.LOCAL) {
        setLocalCount(localCount - 1);
      }
    } else if (isFinishedBefore) {
      if (teamWinnerFinishedBefore === ETeam.VISITOR) {
        setVisitorSetCount(visitorSetCount - 1);
      } else if (teamWinnerFinishedBefore === ETeam.LOCAL) {
        setLocalSetCount(localSetCount - 1);
      }
    }
  };

  const handleReset = React.useCallback(() => {
    setIsReset(true);
    setVisitorCount(0);
    setLocalCount(0);
    setVisitorSetCount(0);
    setLocalSetCount(0);
    setSetsFinished([]);
    setStoredValues("localCount", 0);
    setStoredValues("visitorCount", 0);
    setStoredValues("localSetCount", 0);
    setStoredValues("visitorSetCount", 0);
    setStoredValues("setsFinished", []);
    setTimeout(() => setIsReset(false), 0);
  }, []);

  return (
    <main className="flex flex-col justify-center  bg-purple-volleytip min-h-min h-screen">
      <CustomModal
        isOpen={isSetModalOpen}
        onClose={onSetModalClose}
        onOpenChange={onSetModalOpenChange}
        message={"¿Deseas confirmar que el set se terminó?"}
        onConfirm={handleFinishedSet}
        onCancel={handleNotFinishedSet}
      />
      <CustomModal
        isOpen={isResetModalOpen}
        onClose={onResetModalClose}
        onOpenChange={onResetModalOpenChange}
        message={"¿Deseas reiniciar el partido?"}
        onConfirm={handleReset}
      />
      <img
        className="h-7 fixed top-4 left-4"
        src="/logo-volleytip-horizontal.png"
        alt="Volleytip Icon"
      />
      <button
        className="fixed  top-3 right-3 text-[#fff] w-auto py-1 px-2 border-2 h-fit mt-1 mb-2 border-blue-volleytip rounded-md flex text-xs mx-auto"
        onClick={onResetModalOpen}
      >
        Reiniciar
      </button>
      <div className="flex justify-center h-fit mt-10">
        <div className="text-center min-w-min sm:w-[20%]">
          <Tooltip content="Máximo 10 caracteres">
            <input
              className={`text-[#fff] bg-purple-volleytip block text-2xl sm:text-4xl border-none font-medium focus:outline-none text-center w-full
             `}
              name={ETeam.VISITOR}
              defaultValue="Visitor"
              maxLength={10}
            />
          </Tooltip>
          <Button
            className="bg-blue-volleytip text-purple-volleytip font-bold text-6xl md:text-7xl w-32 h-32 xs:w-48 xs:h-48 md:w-52 md:h-52 rounded-md relative"
            disableRipple
            onClick={() => {
              incrementCount(ETeam.VISITOR);
            }}
          >
            {visitorCount}
            <span
              className={`absolute right-2 bottom-2 transform -translate-x-1/2 w-4 h-4 ${
                lastPressed === ETeam.VISITOR ? "flex" : "hidden"
              }`}
            >
              <img
                className="h-auto"
                src="/volleytip-short.png"
                alt="Volleytip Icon"
              />
            </span>
          </Button>
          <div className="flex justify-center">
            <Actions
              setCount={setVisitorCount}
              isReset={isReset}
              team={ETeam.VISITOR}
            />
          </div>
        </div>

        <div className="text-center flex-col justify-center items-center mt-10 ">
          <div className="flex justify-center">
            <button
              className="text-[#fff] bg-purple-volleytip font-bold text-3xl sm:text-4xl md:text-5xl w-9 sm:w-14 md:w-20 rounded-md shadow hover:bg-blue-600 transition duration-300"
              onClick={() => {
                setVisitorSetCount(visitorSetCount + 1);
                setIsFinishedBefore(true);
                setTeamWinnerFinishedBefore(ETeam.VISITOR);
                onSetModalOpen();
              }}
            >
              {visitorSetCount}
            </button>

            <button
              className="text-[#fff] bg-purple-volleytip font-bold text-3xl sm:text-4xl md:text-5xl w-9 sm:w-14 md:w-20 rounded-md shadow hover:bg-blue-600 transition duration-300"
              onClick={() => {
                setLocalSetCount(localSetCount + 1);
                setIsFinishedBefore(true);
                setTeamWinnerFinishedBefore(ETeam.LOCAL);
                onSetModalOpen();
              }}
            >
              {localSetCount}
            </button>
          </div>

          <ul>
            {setsFinished.map((set, index) => (
              <li key={index} className="flex justify-center">
                <Set key={index} local={set.local} visitor={set.visitor} />
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center min-w-min sm:w-[20%]">
          <Tooltip content="Máximo 10 caracteres">
            <input
              className={`text-[#fff] bg-purple-volleytip block text-2xl sm:text-4xl border-none font-medium focus:outline-none text-center w-full
             `}
              name={ETeam.LOCAL}
              defaultValue="Local"
              maxLength={10}
            />
          </Tooltip>
          <Button
            className="bg-blue-volleytip text-purple-volleytip font-bold text-6xl md:text-7xl w-32 h-32 xs:w-48 xs:h-48 md:w-52 md:h-52 rounded-md relative"
            disableRipple
            onClick={() => {
              incrementCount(ETeam.LOCAL);
            }}
          >
            {localCount}
            <span
              className={`absolute right-2 bottom-2 transform -translate-x-1/2 w-4 h-4 ${
                lastPressed === ETeam.LOCAL ? "flex" : "hidden"
              }`}
            >
              <img
                className="h-auto"
                src="/volleytip-short.png"
                alt="Volleytip Icon"
              />
            </span>
          </Button>
          <div className="flex justify-center">
            <Actions
              setCount={setLocalCount}
              isReset={isReset}
              team={ETeam.LOCAL}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
