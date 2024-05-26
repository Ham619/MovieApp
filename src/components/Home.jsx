import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const Home = () => {
  document.title = "Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      //   console.log(data.results);
      let randomdata =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomdata);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
  }, []);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      //   console.log(data.results);

      setTrending(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className=" w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className=" flex justify-between p-5">
          <h1 className=" text-3xl text-zinc-400 font-semibold">Trending</h1>

          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=>setcategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div> 
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Home;
