import axios from 'axios';

// TODO set this through system variables instead of hardcode
const API_BASE_URL = 'https://be-cloud-stats2.wl.r.appspot.com/files';

class ApiService {

    upload(data, percentile) {
        return axios
            .post(API_BASE_URL + "/upload?percentile=" + percentile, data)
            .catch((error) => {
                console.log(error);
                alert("Error while processing CSV: " + error.response.message);
            });
    }

    getDefaultData(percentile) {
        return axios
            .get(API_BASE_URL + "/default", {params: {percentile: percentile}})
            .catch((error) => {
                console.log(error);
                alert("Error while processing CSV: " + error.response.message);
            });
    }
}

export default new ApiService();