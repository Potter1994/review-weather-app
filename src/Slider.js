import React, { useState } from "react";
// import img1 from "./images/img1.jpg";
// import img2 from "./images/img2.jpg";
// import img3 from "./images/img3.jpg";

const data = [
  {
    key: 1,
    src: 1,
  },
  {
    key: 2,
    src: 1,
  },
  {
    key: 3,
    src: 1,
  },
];

function Slider() {
  const [currentId, setCurrentId] = useState(0);

  const next = () => {
    setCurrentId(currentId + 1 > data.length - 1 ? 0 : currentId + 1);
  };

  const prev = () => {
    setCurrentId(currentId - 1 < 0 ? data.length - 1 : currentId - 1);
  };

  const jumpTo = (id) => {
    console.log(id);
    // setCurrentId(id);
  };

  return (
    <div>
      <img
        src={data[currentId].src}
        style={{ width: "700px" }}
        alt=''
      />
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <button onClick={() => jumpTo(1)}>1</button>
      <button onClick={jumpTo.bind(this, 2)}>2</button>
    </div>
  );
}

export default Slider;
