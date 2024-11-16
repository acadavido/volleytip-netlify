import React from "react";
import { useState } from "react";
import { Set } from "../components/set";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { ETeam, SetDto } from "~/dtos/dtos";
import { Actions } from "~/components/actions";
import { getStoredValue, setStoredValues } from "~/utils/utils";
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          onOpen();
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
          onOpen();
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

  const handleReset = () => {
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
  };

  return (
    <main className="flex flex-col justify-center  bg-purple-volleytip min-h-content h-screen">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmación
              </ModalHeader>
              <ModalBody>
                <p>¿Deseas confirmar que el set se terminó?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  onClick={handleNotFinishedSet}
                >
                  No
                </Button>
                <Button
                  onPress={onClose}
                  onClick={handleFinishedSet}
                  className="bg-purple-volleytip opacity-95 text-[#fff]"
                >
                  Sí
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="justify-center mx-auto mb-2 md:mb-10">
        <img
          className="h-24 md:h-32"
          src="/app/assets/logo-volleytip-vertical.png"
          alt="Volleytip Icon"
        />
      </div>
      <div className="flex justify-center h-fit">
        <div className="text-center min-w-min sm:w-[20%]">
          <Tooltip content="Máximo 8 caracteres">
            <input
              className={`text-[#fff] bg-purple-volleytip block text-3xl sm:text-5xl border-none font-medium focus:outline-none text-center w-full
             `}
              name={ETeam.VISITOR}
              defaultValue="Visitor"
              maxLength={8}
            />
          </Tooltip>
          <Button
            className="bg-blue-volleytip text-purple-volleytip font-bold text-6xl md:text-8xl w-32 h-32 xs:w-44 xs:h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-md relative"
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
                src="/app/assets/volleytip-short.png"
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

        <div className="text-center flex-col justify-center items-center mt-10 sm:mt-16">
          <div className="flex justify-center">
            <button
              className="text-[#fff] bg-purple-volleytip font-bold text-4xl sm:text-5xl md:text-7xl w-9 sm:w-14 md:w-20 rounded-md shadow hover:bg-blue-600 transition duration-300"
              onClick={() => {
                setVisitorSetCount(visitorSetCount + 1);
                setIsFinishedBefore(true);
                setTeamWinnerFinishedBefore(ETeam.VISITOR);
                onOpen();
              }}
            >
              {visitorSetCount}
            </button>

            <button
              className="text-[#fff] bg-purple-volleytip font-bold text-4xl sm:text-5xl md:text-7xl w-9 sm:w-14 md:w-20 rounded-md shadow hover:bg-blue-600 transition duration-300"
              onClick={() => {
                setLocalSetCount(localSetCount + 1);
                setIsFinishedBefore(true);
                setTeamWinnerFinishedBefore(ETeam.LOCAL);
                onOpen();
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
          <Tooltip content="Máximo 8 caracteres">
            <input
              className={`text-[#fff] bg-purple-volleytip block text-3xl sm:text-5xl border-none font-medium focus:outline-none text-center w-full
             `}
              name={ETeam.LOCAL}
              defaultValue="Local"
              maxLength={8}
            />
          </Tooltip>
          <Button
            className="bg-blue-volleytip text-purple-volleytip font-bold text-6xl md:text-8xl w-32 h-32 xs:w-44 xs:h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-md relative"
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
                src="/app/assets/volleytip-short.png"
                alt="Volleytip Icon"
              />
            </span>
          </Button>
          <div className="flex justify-center">
            <Actions
              setCount={setVisitorCount}
              isReset={isReset}
              team={ETeam.LOCAL}
            />
          </div>
        </div>
      </div>
      <button
        className="text-[#fff] w-auto p-2 border-2 h-fit mt-6 border-blue-volleytip rounded-md flex text-xl sm:text-3xl mx-auto"
        onClick={handleReset}
      >
        Reiniciar
      </button>
    </main>
  );
}
