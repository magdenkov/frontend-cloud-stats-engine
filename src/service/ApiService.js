import axios from 'axios';

// TODO set this through system variables instead of hardcode
const API_BASE_URL = 'https://be-cloud-stats2.wl.r.appspot.com/files';

class ApiService {

    upload(data, percentile) {
        return axios.post(API_BASE_URL + "/upload?percentile=" + percentile, data);
    }

    getDefaultData(percentile) {
        return axios.get(API_BASE_URL + "/default", { params: { percentile: percentile } });
    }
}

export default new ApiService();