import axios from 'axios';

export default axios.create({
    baseURL: 'https://gyra-chat-api.herokuapp.com'
});