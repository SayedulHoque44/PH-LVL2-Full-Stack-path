"use client"; // it will be always a client component

const error = ({ error, reset }) => {
  console.log(error);
  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-red-400 font-bold text-2xl text-center my-3">
        {error.message}
      </h1>
      <button onClick={() => reset()}></button>
    </div>
  );
};

export default error;
