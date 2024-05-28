import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";
import { useParams } from 'react-router-dom';

const Moviedetails = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const {id} = useParams();
     dispatch(asyncloadmovie(id));
     return () => {
      //cleanup
      dispatch(removemovie());
     };
  },[])

  return (
    <div>Moviedetails</div>
  )
}

export default Moviedetails