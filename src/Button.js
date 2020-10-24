import React, { useState } from "react";
import "./Button.css";

function Button(props) {
  let [numberOfClicks, setNumberOfClicks] = useState(0);

  var onButtonClick = () => {
    alert("I clicked a button");
  };
  if (props.onClick != null) {
    onButtonClick = props.onClick;
  }

  if (props.buttonText == null) {
    return (
      <div className="Button">
        <button onClick={onButtonClick}>Default button text</button>
      </div>
    );
  }

  return (
    <div className="Button">
      <p>{"The number of clicks is " + numberOfClicks}</p>
      <button
        onClick={() => {
          if (props.resetCounter != null) {
            setNumberOfClicks(props.resetCounter(numberOfClicks));
          } else {
            setNumberOfClicks(numberOfClicks + 1);
          }
          onButtonClick();
        }}
      >
        {props.buttonText}
      </button>
    </div>
  );
}

export default Button;
