import React, { useState, useEffect } from 'react';

function Slider() {
    const[sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
      };


    return (
        <div class = "Threshold">
            <h2 class = "Threshold Name"> Current Threshold Rating: </h2>
            <div class="slidecontainer">
                <input type="range" min="1" max="100" value={sliderValue} onChange = {handleSliderChange} class="slider" id="myRange">
                </input>
                <h2 class = "sliderValue"> {sliderValue} </h2>
            </div>
        </div>
    );

}

export default Slider;
