import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  
  const navigate = useNavigate();

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
 
  document.title = "MovieApp | Trending " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      
        if(data.results.length > 0){
            settrending((prev)=> [...prev, ...data.results]);
            setpage(page + 1);
        }else{
            sethasMore(false);
        }
    
      
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    if(trending.length === 0){
        GetTrending();
    }else {
        setpage(1);
        settrending([]);
        GetTrending();
    }
  }

  useEffect(() => {
    refreshHandler();
  },[category,duration])

  return trending.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl text-zinc-400 font-semibold mr-4">
          <i
            onClick={() => navigate(-1)}
            class=" hover:text-[#6556CD] ri-arrow-left-fill mr-2"
          ></i>
          Trending
        </h1>

        <div className=" flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className=" w-[2%]"></div>
          <Dropdown
            title="category"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        next={GetTrending}
        dataLength={trending.length}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
