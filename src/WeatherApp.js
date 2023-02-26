import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import sunriseAndSunsetData from "./sunrise-sunset.json";
import useWeatherApi from "./useWeatherApi";
import WeatherCard from "./WeatherCard";
import WeatherSetting from "./WeatherSetting";
import { findLocation } from "./utils";

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getMoment = (locationName) => {
  const location = sunriseAndSunsetData.find((i) => i.locationName === locationName);

  if (!location) return null;

  const nowDate = Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/\//g, "-");

  const locationData = location.time && location.time.find((i) => i.dataTime === nowDate);
  const sunriseTimestamp = new Date(`${locationData.dataTime} ${locationData.sunrise}`).getTime();
  const sunsetTimestamp = new Date(`${locationData.dataTime} ${locationData.sunset}`).getTime();
  const nowTimeStamp = new Date().getTime();

  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp ? "day" : "night";
};

const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow: "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

function WeatherApp() {
  const storageCity = localStorage.getItem("cityName");
  const [currentCity, setCurrentCity] = useState(storageCity || "高雄市");
  const currentLocation = findLocation(currentCity) || {};
  const [currentPage, setCurrentPage] = useState("WeatherCard");
  const [weatherElement, fetchData] = useWeatherApi(currentLocation);
  const [currentTheme, setCurrentTheme] = useState("light");

  const moment = useMemo(() => getMoment(currentLocation.cityName), [currentLocation.cityName]);

  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]);

  useEffect(() => {
    localStorage.setItem("cityName", currentCity);
  }, [currentCity]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            cityName={currentLocation.cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSetting
            cityName={currentLocation.cityName}
            setCurrentCity={setCurrentCity}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default WeatherApp;
