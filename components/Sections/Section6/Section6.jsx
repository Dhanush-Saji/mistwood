import React from "react";

const Section6 = () => {
  return (
    <div
      className="sixth-section bg-[#ecedef] w-screen h-screen py-10 px-5 md:px-32 relative"
    >
      <div className="mt-10">
        <span className="text-5xl md:text-5xl font-extrabold">
          Love to here from you, <br />
          Get in touch👋
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <div className="flex flex-col gap-2">
            <label for="">Your name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="px-5 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="">Your email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="px-5 py-2 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label for="">Your message</label>
          <textarea
            placeholder="Enter message"
            name=""
            id=""
            cols="8"
            rows="8"
            className="px-5 py-2 rounded-md"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Section6;
