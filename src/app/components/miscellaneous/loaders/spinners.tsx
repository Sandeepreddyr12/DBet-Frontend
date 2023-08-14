export const DotLoader = () => {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export const MainSpinner = () => {
  return (
    <div className="w-full h-screen bg-green-200 flex justify-center items-center">
    <div
      className="w-32 h-32 rounded-full animate-spin
                    border-x-4 border-solid border-green-900 border-t-transparent"
    >
    </div>
    </div>
  );
};
