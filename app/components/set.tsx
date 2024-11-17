import { SetDto } from "~/dtos/dtos";

// eslint-disable-next-line react/prop-types
export function Set({ local, visitor }: SetDto) {
  return (
    <>
      <div
        className="text-[#fff] w-10 h-5 m-1 border-2 border-blue-volleytip rounded-md flex justify-center items-center"
      >
        {visitor}
      </div>
      <div
        className="text-[#fff] w-10 h-5 m-1 border-2 border-blue-volleytip rounded-md flex justify-center items-center"
      >
        {local}
      </div>
    </>
  );
}
