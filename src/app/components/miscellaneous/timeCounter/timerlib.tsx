'use client';
import Countdown, { CountdownRenderProps } from 'react-countdown';

type props = {
  timeStamp:number,
};

export default function Timer({ timeStamp }: props) {
  const Completionist = () => <span>Time Up!</span>;

  // just faking here for user experence
  //timeStamp * 1000 + 2.1e6 is original block stamp
  let timer =
    timeStamp * 1000 + 2.1e6 > Date.now()
      ? timeStamp * 1000 + 2.1e6
      : Date.now() + 600000;

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return (
        <span
          className="w-full bg-red-100 
                 bg-opacity-70 text-red-900 font-semibold text-xs py-[2px] px-[5px] rounded-lg "
        >
          <Completionist />
        </span>
      );
    }

    if (!days) {
      if (!hours) {
        return (
          <span
            className="w-full bg-red-100 
                 bg-opacity-70 text-red-900 font-semibold py-[2px] text-sm px-[5px] rounded-md"
          >
            {minutes}m {seconds}s
          </span>
        );
      }

      return (
        <span
          className="w-full bg-green-100 
                  bg-opacity-50 text-green-900 font-semibold text-sm py-[2px] px-[5px] rounded-md "
        >
          {hours}h {minutes}m
        </span>
      );
    }

    // Render a countdown
    return (
      <span
        className="w-full bg-green-100 
                  bg-opacity-50 text-green-900 font-semibold text-sm py-[2px] px-[5px] rounded-md "
      >
        {days}d {hours}h
      </span>
    );
  };
  return (
    <div className="w-full">
      <Countdown date={timer} renderer={renderer} />
    </div>
  );
}
