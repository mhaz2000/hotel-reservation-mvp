import axios from 'axios';

const anonymousAxios = axios.create({
  baseURL: 'https://corsproxy.io/' + import.meta.env.VITE_API_BASE_URL + 'api/'
});

export default anonymousAxios;