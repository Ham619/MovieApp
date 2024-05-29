import axios from '../utils/axios';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {

    
  const navigate = useNavigate();

  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MovieApp | People " + category.toUpperCase();

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      
        if(data.results.length > 0){
            setpeople((prev)=> [...prev, ...data.results]);
            setpage(page + 1);
        }else{
            sethasMore(false);
        }
    
      
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    if(people.length === 0){
        GetPeople();
    }else {
        setpage(1);
        setpeople([]);
        GetPeople();
    }
  }

  useEffect(() => {
    refreshHandler();
  },[category]);

  return people.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl text-zinc-400 font-semibold mr-4">
          <i
            onClick={() => navigate(-1)}
            class=" hover:text-[#6556CD] ri-arrow-left-fill mr-2"
          ></i>
          people 
        </h1>

        <div className=" flex items-center w-[80%]">
          <Topnav />
          
        </div>
      </div>

      <InfiniteScroll
        next={GetPeople}
        dataLength={people.length}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};


export default People