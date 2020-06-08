import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/files';

class ApiService {

    upload(data, percentile) {
        return axios.post(USER_API_BASE_URL + "/upload?percentile=" + percentile, data);
    }

}

export default new ApiService();