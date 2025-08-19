import axios from 'axios';

export const anonymousAxios = axios.create({
  // baseURL: 'https://corsproxy.io/' + import.meta.env.VITE_API_BASE_URL + 'api/'
  baseURL: import.meta.env.VITE_API_BASE_URL + 'api/app/v1/'
});

// export const authorizedAxios = axios.create({
//   baseURL: 'https://corsproxy.io/' + "https://www.iranhotelonline.com/api/app/v1/",
//   headers: {
//     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MDM1OTYiLCJGY21JZCI6IjAiLCJBcHBsaWNhdGlvblRva2VuSWQiOiIyOSIsIkFwcGxpY2F0aW9uSWQiOiIyOSIsIklzVGVzdCI6IkZhbHNlIiwiSXNJaG9DbGllbnQiOiJGYWxzZSIsIkV4cGlyZVRpbWUiOiI0LzYvMjAyNiAxMDoxNjo1MyBBTSIsInJvbGUiOiJBZ2VuY2llcyIsIm5iZiI6MTc0MzkyMjM4OCwiZXhwIjoxNzc2MDYyODEzLCJpYXQiOjE3NDM5MjIzODh9.PusbLr9xR3FCfVzQoaRbN4otGeP8uHTWaReSx81fY2g"
//   }
// });


export const authorizedAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + 'api/',
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MDM1OTYiLCJGY21JZCI6IjAiLCJBcHBsaWNhdGlvblRva2VuSWQiOiIyOSIsIkFwcGxpY2F0aW9uSWQiOiIyOSIsIklzVGVzdCI6IkZhbHNlIiwiSXNJaG9DbGllbnQiOiJGYWxzZSIsIkV4cGlyZVRpbWUiOiI0LzYvMjAyNiAxMDoxNjo1MyBBTSIsInJvbGUiOiJBZ2VuY2llcyIsIm5iZiI6MTc0MzkyMjM4OCwiZXhwIjoxNzc2MDYyODEzLCJpYXQiOjE3NDM5MjIzODh9.PusbLr9xR3FCfVzQoaRbN4otGeP8uHTWaReSx81fY2g"
  }
});