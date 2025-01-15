import { SetDto } from "~/dtos/dtos";

// eslint-disable-next-line react/prop-types
export function Set({ local, visitor, isSideSwitched }: SetDto) {
  return (
    <>
      <div
        className={`text-[#fff] md:text-xl w-8 h-8 md:w-10 md:h-10 m-1 border-2 border-blue-volleytip rounded-md flex justify-center items-center ${
          isSideSwitched ? "order-2" : "order-1"
        }`}
      >
        {visitor}
      </div>
      <div
        className={`text-[#fff] md:text-xl w-8 h-8 md:w-10 md:h-10 m-1 border-2 border-blue-volleytip rounded-md flex justify-center items-center ${
          isSideSwitched ? "order-1" : "order-2"
        }`}
      >
        {local}
      </div>
    </>
  );
}
