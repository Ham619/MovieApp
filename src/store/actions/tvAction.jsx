export { removetv} from '../reducers/tvSlice'
import axios from "../../utils/axios";
import { loadtv } from '../reducers/tvSlice';

export const ayncloadtv = (id) => async(dispatch, getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendation = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        // const videos = await axios.get(`/tv/${id}/vedios`);
        const watchprovider = await axios.get(`/tv/${id}/watch/providers`);

        let ultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendation: recommendation.data.results,
            similar: similar.data.results,
            // videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchprovider: watchprovider.data.results.IN,

        };

        dispatch(loadtv(ultimatedetails));

    } catch (error) {
        console.error(error);
    }
};