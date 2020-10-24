import "./App.css";
import React, { useState } from "react";
import Button from "./Button";
import { Camera } from "react-cam";

function App() {
  let [isFrontCamera, setIsFrontCamera] = useState(false);
  let [isCameraOn, setIsCameraOn] = useState(false);

  return (
    <div className="App">
      <h1> Our example camera web app </h1>
      {isCameraOn ? (
        <Camera
          showFocus={false}
          front={isFrontCamera}
          capture={null}
          ref={null}
          width="800px"
          height="500px"
          btnColor="rgb(0,0,0,0)"
        />
      ) : null}
      <Button
        buttonText="Toggle Camera"
        onClick={() => {
          setIsCameraOn(!isCameraOn);
        }}
      />

      <Button
        buttonText="Change camera"
        onClick={() => {
          setIsFrontCamera(!isFrontCamera);
        }}
      />
      <Button buttonText="Capture Image" />
      <Button
        buttonText={"Reset button"}
        onClick={() => {}}
        resetCounter={(currentCounter) => {
          if (currentCounter >= 10) {
            return 0;
          } else return currentCounter + 1;
        }}
      />
    </div>
  );
}

export default App;
