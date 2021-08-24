import Axios from "axios";
const API_KEY = "d0be9ab2f89d530900d7c4653d49686f";
const OpenWeatherBaseURL = Axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

const createCityURL = (city = "London") => `weather?q=${city}&appid=${API_KEY}`;

const fetchWeatherData = async (city) => {
  return await OpenWeatherBaseURL.get(createCityURL(city))
    .then((re) => re.data)
    .catch((e) => e.message);
};

export default fetchWeatherData;
