import React, { useState, useEffect } from 'react';

function Slider() {
    const[sliderValue, setSliderValue] = useState(50);


    return (
        <div class = "Threshold">
            <h2 class = "Threshold Name"> Current Threshold Rating: </h2>
            <div class="slidecontainer">
                <input type="range" min="1" max="100" value={sliderValue} class="slider" id="myRange">
                </input>
            </div>
        </div>
    );

}

export default Slider;
