import axios from '../utils/axios';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';


const Tvshows = () => {


  const navigate = useNavigate();

  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MovieApp | Tv shows " + category.toUpperCase();

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      
        if(data.results.length > 0){
            settv((prev)=> [...prev, ...data.results]);
            setpage(page + 1);
        }else{
            sethasMore(false);
        }
    
      
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    if(tv.length === 0){
        GetTv();
    }else {
        setpage(1);
        settv([]);
        GetTv();
    }
  }

  useEffect(() => {
    refreshHandler();
  },[category]);


  return tv.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl text-zinc-400 font-semibold mr-4">
          <i
            onClick={() => navigate(-1)}
            class=" hover:text-[#6556CD] ri-arrow-left-fill mr-2"
          ></i>
          Tv shows <small className=' ml-2 text-sm text-zinc-600'>({category})</small>
        </h1>

        <div className=" flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="category"
            options={["airing_today", "on_the_air","popular","top_rated"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className=" w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        next={GetTv}
        dataLength={tv.length}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};


export default Tvshows