import React from 'react';

function Slider({ threshold, onSliderChange }) {
  return (
    <div className="Threshold">
      <h2 className="Threshold Name"> Current Threshold Rating: </h2>
      <div className="slidecontainer">
        <input
          type="range"
          min="1"
          max="100"
          value={threshold}
          onChange={onSliderChange}
          className="slider"
          id="myRange"
        />
        <h2 className="sliderValue"> {threshold} </h2>
      </div>
    </div>
  );
}

export default Slider;
