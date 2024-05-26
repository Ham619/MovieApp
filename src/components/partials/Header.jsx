import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className=" w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className=" w-[70%] text-5xl text-white font-black">
        {data.name || data.title || data.orignal_name || data.orignal_title}
      </h1>
      <p className=" w-[70%] mt-3 mb-3 text-white ">
        {data.overview.slice(0, 200)}...
        <Link className="text-blue-400">more</Link>
      </p>
      <p className=" text-white">
      <i className=" text-yellow-500 ri-megaphone-fill"></i>{data.release_date || "No Information"}
      <i className=" ml-5 text-yellow-500 ri-album-fill"></i>{data.media_type.toUpperCase()}
      </p>
      <Link className=" p-4 rounded text-white mt-5 bg-[#6556CD]"> Watch Trailer</Link>
    </div>
  );
};

export default Header;
