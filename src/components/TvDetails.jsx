import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ayncloadtv, removetv } from "../store/actions/tvAction.jsx";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading.jsx";
import HorizontalCards from "./partials/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ayncloadtv(id));
    return () => {
      //cleanup
      dispatch(removetv());
    };
  }, [id]);

  console.log(info);

  const [percentage, setPercentage] = useState("");

  const getColorClass = (percentage) => {
    return percentage > 75
      ? "bg-green-600"
      : percentage > 50
      ? "bg-yellow-600"
      : "bg-red-600";
  };
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className=" relative w-screen h-[160vh] px-[10%]"
    >
      <nav className=" h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-2xl ">
        <Link
          onClick={() => navigate(-1)}
          class=" hover:text-[#6556CD] ri-arrow-left-fill mr-2"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Poster and details */}
      <div className=" w-full flex">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className=" content ml-[5%] text-white ">
          <h1 className=" text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.orignal_name ||
              info.detail.orignal_title ||
              info.detail.profile_path}

            <span className=" text-2xl ml-1 font-bold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </span>
          </h1>

          <div className=" mt-3 mb-5 flex text-white items-center gap-x-3 ">
            <span
              className={` ${getColorClass(
                (info.detail.vote_average * 10).toFixed()
              )} text-xl font-semibold rounded-full text-white w-[5vh] h-[5vh] flex justify-center items-center`}
            >
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className=" w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className=" text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className=" text-2xl mt-5 mb-3 text-white ">Overview</h1>
          <p className=" text-xl mb-10">{info.detail.overview}</p>

          <Link
            className=" mt-5 px-10 py-5 bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i class="  ri-play-fill mr-3"></i>Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Available on Platform */}
      <div className=" w-[80%] flex flex-col gap-y-5 mt-10  ">
        {info.watchprovider && info.watchprovider.flatrate && (
          <div className=" flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchprovider.flatrate.map((w) => (
              <img
                className=" w-[5vh] h-[5vh] pbject-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchprovider && info.watchprovider.rent && (
          <div className=" flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchprovider.rent.map((w) => (
              <img
                className=" w-[5vh] h-[5vh] pbject-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchprovider && info.watchprovider.buy && (
          <div className=" flex gap-x-10 items-center text-white">
            <h1>Available on Buy</h1>
            {info.watchprovider.buy.map((w) => (
              <img
                className=" w-[5vh] h-[5vh] pbject-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Seasons */}
      <hr className=" mt-10 mb-5 border-none h-[2px] bg-zinc-400" />
      <h1 className=" text-3xl font-bold text-white">
        Seasons
      </h1>
      <HorizontalCards
        data={
          info.detail.seasons}
      />

      {/* Part 5 Seasons */}
      <hr className=" mt-10 mb-5 border-none h-[2px] bg-zinc-400" />
      <h1 className=" text-3xl font-bold text-white">
        Recommendations & Similar
      </h1>
      <HorizontalCards
        data={
          info.recommendation.length > 0 ? info.recommendation : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
