export const Global = {
    url: process.env.API_URL ? process.env.API_URL : "http://localhost:5200/api/",
    urlDjango: process.env.API_URL ? process.env.API_URL : "http://localhost:8000/api/v1/"
};

export default Global;
