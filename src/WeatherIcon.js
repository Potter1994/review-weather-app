import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { ReactComponent as DayThunderstorm } from "./images/day-thunderstorm.svg";
import { ReactComponent as DayClear } from "./images/day-clear.svg";
import { ReactComponent as DayCloudyFog } from "./images/day-cloudy-fog.svg";
import { ReactComponent as DayCloudy } from "./images/day-cloudy.svg";
import { ReactComponent as DayFog } from "./images/day-fog.svg";
import { ReactComponent as DayRain } from "./images/day-rain.svg";
import { ReactComponent as DaySnowing } from "./images/day-snow.svg";
import { ReactComponent as NightThunderstorm } from "./images/night-thunderstorm.svg";
import { ReactComponent as NightClear } from "./images/night-clear.svg";
import { ReactComponent as NightCloudyFog } from "./images/night-cloudy-fog.svg";
import { ReactComponent as NightCloudy } from "./images/night-cloudy.svg";
import { ReactComponent as NightFog } from "./images/night-fog.svg";
import { ReactComponent as NightRain } from "./images/night-rain.svg";
import { ReactComponent as NightSnowing } from "./images/night-snow.svg";

const Container = styled.div`
  flex-basis: 30%;

  svg {
    max-height: 110px;
  }
`;

const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isRain: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
  isSnowing: [23, 37, 42],
};

const weatherIcons = {
  day: {
    isThunderstorm: <DayThunderstorm />,
    isClear: <DayClear />,
    isCloudyFog: <DayCloudyFog />,
    isCloudy: <DayCloudy />,
    isFog: <DayFog />,
    isRain: <DayRain />,
    isSnowing: <DaySnowing />,
  },
  night: {
    isThunderstorm: <NightThunderstorm />,
    isClear: <NightClear />,
    isCloudyFog: <NightCloudyFog />,
    isCloudy: <NightCloudy />,
    isFog: <NightFog />,
    isRain: <NightRain />,
    isSnowing: <NightSnowing />,
  },
};

const weatherCode2Type = (weatherCode) => {
  const [weatherType] = Object.entries(weatherTypes).find(([weatherType, weatherCodes]) => weatherCodes.includes(Number(weatherCode))) || [];

  return weatherType;
};

function WeatherIcon({ currentWeatherCode, moment }) {
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("isClear");

  const theWeatherIcon = useMemo(() => weatherCode2Type(currentWeatherCode), [currentWeatherCode]);

  useEffect(() => {
    setCurrentWeatherIcon(theWeatherIcon);
  }, [theWeatherIcon]);

  return <Container>{weatherIcons[moment][currentWeatherIcon]}</Container>;
}

export default WeatherIcon;
