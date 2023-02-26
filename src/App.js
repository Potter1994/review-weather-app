import "./App.css";
import WeatherApp from "./WeatherApp";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const Counter = ({ startValue }) => {
    const [count, setCount] = useState(startValue || 5);
    const handleClick = (type) => () => setCount(type === "increment" ? count + 1 : count - 1);

    return (
      <div className='App'>
        <div
          className='chevron chevron-up'
          style={{ visibility: count >= 10 && "hidden" }}
          onClick={handleClick("increment")}></div>
        <div className='number'>{count}</div>
        <div
          className={`chevron chevron-down ${count <= 0 ? "hidden" : ""}`}
          style={{ visibility: count <= 0 && "hidden" }}
          onClick={handleClick("decrement")}></div>
      </div>
    );
  };

  const UnitControl = () => (
    <div className='unit-control'>
      <div className='unit'>Mbps</div>
      <span className='exchange-icon fa-fw fa-stack'>
        <i className='far fa-circle fa-stack-2x' />
        <i className='fas fa-exchange-alt fa-stack-1x' />
      </span>
      <div className='unit'>MB/s</div>
    </div>
  );

  const CardFooter = (props) => {
    const { inputValue } = props;
    let criteria;

    if (!inputValue) {
      criteria = {
        title: "---",
        backgroundColor: "#d3d8e2",
      };
    } else if (inputValue < 15) {
      criteria = {
        title: "SLOW",
        backgroundColor: "#ee362d",
      };
    } else if (inputValue < 40) {
      criteria = {
        title: "GOOD",
        backgroundColor: "#1b82f1",
      };
    } else if (inputValue >= 40) {
      criteria = {
        title: "FAST",
        backgroundColor: "#13d569",
      };
    }

    return (
      <div
        className='card-footer'
        style={{ backgroundColor: criteria.backgroundColor }}>
        {criteria.title}
      </div>
    );
  };

  const NetworkSpeedConverter = (
    <div className='container'>
      {/* {console.log(`render`)} */}
      <div className='card-header'>Network Speed Converter</div>
      <div className='card-body'>
        <UnitControl />
        <div className='converter'>
          <div className='flex-1'>
            <div className='converter-title'>Set</div>
            <input
              className='input-number'
              type='number'
              min='0'
              onChange={handleInputChange}
              value={inputValue}
            />
          </div>
          <span
            className='angle-icon fa-2x'
            style={{ marginTop: "30px" }}>
            <i className='fas fa-angle-right' />
          </span>
          <div className='text-right flex-1'>
            <div className='converter-title'>Show</div>
            <input
              type='text'
              className='input-number text-right'
              value={inputValue / 8}
              disabled
            />
          </div>
        </div>
      </div>
      <CardFooter inputValue={inputValue} />
    </div>
  );

  return <WeatherApp />;
}

export default App;
