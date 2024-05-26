import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const HorizontalCards = ({ data }) => {
  return (
    <div className=" w-[100%] flex  overflow-y-hidden mb-5 p-5">
      {data.map((d, i) => (
        <div key={i} className=" min-w-[15%] bg-zinc-900 mr-5 mb-5 ">
          <img
            className=" w-full h-[55%] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path
            })`}
            alt=""
          />
          <div className=" text-white p-3 h-[45%] ">
            <h1 className=" text-xl  font-semibold">
              {d.name || d.title || d.orignal_name || d.orignal_title}
            </h1>
            <p className=" ">
              {d.overview.slice(0, 50)}...
              <span className="text-zinc-300">more</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalCards;