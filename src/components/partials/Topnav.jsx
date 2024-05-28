import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "../../public/noimage.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");

  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      //   console.log(data.results);
      setSearches(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className=" w-[80%] h-[10vh] relative flex mx-auto items-center ">
      <i className="ri-search-line text-zinc-400 text-3xl"></i>
      <input 
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className=" w-[50%] text-zinc-400 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search here"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className=" absolute ri-close-line right-0 text-zinc-400 text-3xl"
        ></i>
      )}

      <div className=" z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto rounded">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className=" font-semibold text-zinc-600 text-xl w-[100%] p-10 flex justify-start  items-center border-b-2 border-zinc-100 hover:text-black hover:bg-zinc-300 duration-200 "
          >
            <img
              className=" w-[10vh] h-[10vh] object-cover mr-5 rounded shadow-lg"
              src={
                s.backdrop_path || 
                s.profile_path ?
                `https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path
              }` : noimage}
              alt=""
            />
            <span>
              {s.name || s.title || s.orignal_name || s.orignal_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
