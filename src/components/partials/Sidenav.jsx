import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {

  

  return (
    <>
      <div className=" w-[20%] h-full border-r-2 border-zinc-200 p-3">
        <h1 className=" text-2xl text-white font-bold">
          <i class=" text-[#6556CD] ri-tv-fill mr-3"></i>
          <span className="">Movie App</span>
        </h1>
        <nav className=" flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className=" text-white font-semibold text-xl mt-10 mb-5">
            New Feeds
          </h1>
          <Link to="/trending" className=" hover:bg-[#6556CD] hover:text-white duration-500 rounded-lg p-5 ">
          <i className="ri-fire-line mr-2"></i>Trending
          </Link>
          <Link className=" hover:bg-[#6556CD] hover:text-white duration-500 rounded-lg p-5 ">
          <i className="ri-bard-fill mr-2"></i>Popular
          </Link>
          <Link className=" hover:bg-[#6556CD] hover:text-white duration-500 rounded-lg p-5 ">
          <i className="ri-movie-2-fill mr-2"></i>Movies
          </Link>
          <Link className=" hover:bg-[#6556CD] hover:text-white duration-500 rounded-lg p-5 ">
          <i className="ri-tv-2-fill mr-2"></i>Tv Shows
          </Link>
          <Link className=" hover:bg-[#6556CD] hover:text-white duration-500 rounded-lg p-5 ">
          <i className="ri-user-fill mr-2"></i>People
          </Link>

          <hr className=" border-none h-[1px] bg-zinc-400"/>
          <h1 className=" text-white font-semibold text-xl mt-10 mb-5">
            Website Information
          </h1>
          <Link className=" hover:bg-[#6556CD] hover:text-white duration-500 rounded-lg p-5 ">
          <i class="ri-information-fill mr-2"></i>About
          </Link>
          <Link className=" hover:bg-[#6556CD] hover:text-white duration-500 rounded-lg p-5 ">
          <i class="ri-phone-fill mr-2"></i>Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
