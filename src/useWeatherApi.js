import { useState, useEffect, useCallback } from "react";
const token = "CWB-4254CE67-A508-488D-B1E9-4DAAB99A21B6";

export const fetchCurrentWeather = (locationName) => {
  return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${token}&locationName=${locationName}`)
    .then((res) => res.json())
    .then((data) => {
      const locationData = data.records.location[0];

      const weatherElement = locationData.weatherElement.reduce((prev, current) => {
        if (["WDSD", "TEMP", "HUMD"].includes(current.elementName)) {
          prev[current.elementName] = current.elementValue;
        }

        return prev;
      }, {});

      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.parameter.find((i) => i.parameterName === "CITY").parameterValue,
        temperature: weatherElement.TEMP,
        windSpeed: weatherElement.WDSD,
        humid: weatherElement.HUMD,
      };
    });
};

export const fetchWeatherForecast = (cityName) => {
  return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${token}&locationName=${cityName}`)
    .then((res) => res.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElement = locationData.weatherElement.reduce((prev, current) => {
        if (["Wx", "PoP", "CI"].includes(current.elementName)) {
          prev[current.elementName] = current.time[0].parameter;
        }

        return prev;
      }, {});

      return {
        description: weatherElement.Wx.parameterName,
        weatherCode: weatherElement.Wx.parameterValue,
        rainPossibility: weatherElement.PoP.parameterName,
        comfortability: weatherElement.CI.parameterName,
      };
    });
};

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    isLoading: true,
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([fetchCurrentWeather(locationName), fetchWeatherForecast(cityName)]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      });
    };

    setWeatherElement((prev) => ({ ...prev, isLoading: true }));

    fetchingData();
  }, [locationName, cityName]);

  useEffect(() => {
    console.log("execute function in effect");
    fetchData();

    return () => {
      console.log("Effect out");
    };
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherApi;
