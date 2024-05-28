import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {


  const navigate = useNavigate();

  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MovieApp | Popular " + category.toUpperCase();

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      
        if(data.results.length > 0){
            setpopular((prev)=> [...prev, ...data.results]);
            setpage(page + 1);
        }else{
            sethasMore(false);
        }
    
      
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    if(popular.length === 0){
        GetPopular();
    }else {
        setpage(1);
        setpopular([]);
        GetPopular();
    }
  }

  useEffect(() => {
    refreshHandler();
  },[category])


  return popular.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl text-zinc-400 font-semibold mr-4">
          <i
            onClick={() => navigate(-1)}
            class=" hover:text-[#6556CD] ri-arrow-left-fill mr-2"
          ></i>
          Popular
        </h1>

        <div className=" flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className=" w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        next={GetPopular}
        dataLength={popular.length}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};


export default Popular