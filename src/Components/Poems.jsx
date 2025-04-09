import React from "react";

const Poems = ({ page, data }) => {
  return (
    <div className={page % 2 === 0 ? "bg-gray-200 h-full" : "bg-gray-300 h-full"}>
      <div className="text-center py-6">
        <div className="text-2xl font-bold tracking-wide">{data?.Title}</div>
      </div>
      <div className="h-full w-full flex flex-col justify-center pb-40 gap-4 px-6  items-center">
        {data?.stanzas.map((itm, idx) => (
          <textarea
            key={idx}
            readOnly
            value={itm}
            className={`w-full max-w-3xl min-h-[6rem] resize-none font-semibold  rounded-md p-4 text-center text-base font-serif leading-relaxed text-gray-800`}
          />
        ))}
      </div>
    </div>
  );
};

export default Poems;
