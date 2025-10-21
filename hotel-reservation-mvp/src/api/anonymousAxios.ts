import axios from 'axios';

export const authorizedAxios = (import.meta.env.VITE_API_BASE_URL as string).includes("donyaseir") ?
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + 'api/',
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MDM1OTYiLCJGY21JZCI6IjAiLCJBcHBsaWNhdGlvblRva2VuSWQiOiIyOSIsIkFwcGxpY2F0aW9uSWQiOiIyOSIsIklzVGVzdCI6IkZhbHNlIiwiSXNJaG9DbGllbnQiOiJGYWxzZSIsIkV4cGlyZVRpbWUiOiI0LzYvMjAyNiAxMDoxNjo1MyBBTSIsInJvbGUiOiJBZ2VuY2llcyIsIm5iZiI6MTc0MzkyMjM4OCwiZXhwIjoxNzc2MDYyODEzLCJpYXQiOjE3NDM5MjIzODh9.PusbLr9xR3FCfVzQoaRbN4otGeP8uHTWaReSx81fY2g"
    }
  }) :
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + 'api/',
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTE3NDMiLCJGY21JZCI6IjAiLCJBcHBsaWNhdGlvblRva2VuSWQiOiIzMSIsIkFwcGxpY2F0aW9uSWQiOiIzMSIsIklzVGVzdCI6IkZhbHNlIiwiSXNJaG9DbGllbnQiOiJGYWxzZSIsIkV4cGlyZVRpbWUiOiIxMC8xOS8yMDI2IDExOjQzOjM0IEFNIiwicm9sZSI6IkFnZW5jaWVzIiwibmJmIjoxNzYwODY5NDY0LCJleHAiOjE3OTMwMDI0MTQsImlhdCI6MTc2MDg2OTQ2NH0.3hNcmIoG0LAK5gd8sfSPBjlJBQQWBs68tbAuvkTVzXM"
    }
  })
  ;