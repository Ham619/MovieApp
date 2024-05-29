export { removemovie} from '../reducers/movieSlice'
import axios from "../../utils/axios";
import { loadmovie } from '../reducers/movieSlice';

export const ayncloadmovie = (id) => async(dispatch, getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendation = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        // const videos = await axios.get(`/movie/${id}/vedios`);
        const watchprovider = await axios.get(`/movie/${id}/watch/providers`);

        let ultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendation: recommendation.data.results,
            similar: similar.data.results,
            // videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchprovider: watchprovider.data.results.IN,

        };

        dispatch(loadmovie(ultimatedetails));

    } catch (error) {
        console.error(error);
    }
};