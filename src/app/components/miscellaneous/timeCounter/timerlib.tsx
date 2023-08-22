'use client';
import Countdown, { CountdownRenderProps } from 'react-countdown';

export default function Timer({ timeStamp }: number) {
  const Completionist = () => <span>Time Up!</span>;

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
      <Countdown date={timeStamp * 1000 + 2.1e+6} renderer={renderer} />
    </div>
  );
}
