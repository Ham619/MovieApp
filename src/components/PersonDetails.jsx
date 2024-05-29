import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ayncloadperson,
  removeperson,
} from "../store/actions/personAction.jsx";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading.jsx";
import HorizontalCards from "./partials/HorizontalCards";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ayncloadperson(id));
    return () => {
      //cleanup
      dispatch(removeperson());
    };
  }, [id]);

  // console.log(info);

  const [percentage, setPercentage] = useState("");

  const getColorClass = (percentage) => {
    return percentage > 75
      ? "bg-green-600"
      : percentage > 50
      ? "bg-yellow-600"
      : "bg-red-600";
  };

  return info ? (
    <div className=" p-[5%] w-screen flex flex-col">
      <nav className=" w-full text-zinc-100 flex items-center gap-10 text-2xl ">
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
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
