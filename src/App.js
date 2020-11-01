import "./App.css";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
  useContext,
} from "react";
import Button from "./Button";
import { Camera } from "react-cam";
import axios from "axios";

function useClassifyImage(initImage) {
  const [imageCaptured, setImageCaptured] = useState(initImage);
  const [result, setResult] = useState("unclassified");
  const someValue = "category";
  const handleResponse = useCallback(
    (res) => {
      setResult(res.data.text + someValue);
    },
    [someValue]
  );

  useEffect(() => {
    const backendAPI = axios.create({
      baseURL: "https://cu-intro-project.herokuapp.com",
      headers: {
        "Content-Type": "application/json",
      },
    });
    backendAPI
      .post("/predict", JSON.stringify({ file: imageCaptured }))
      .then((res) => {
        handleResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imageCaptured, handleResponse]);

  return [result, setImageCaptured];
}

const ACTIONS = {
  TOGGLE_CAMERA: "toggle_camera",
  CHANGE_CAMERA: "change_camera",
  CAPTURE_IMAGE: "capture_image",
  TOGGLE_FOCUS_SHOWN: "toggle_focus_shown",
};

function cameraReducer(prevState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_CAMERA:
      return {
        ...prevState,
        isCameraOn: !prevState.isCameraOn,
      };
    case ACTIONS.CHANGE_CAMERA:
      return {
        ...prevState,
        isFrontCamera: !prevState.isFrontCamera,
      };
    case ACTIONS.TOGGLE_FOCUS_SHOWN:
      return {
        ...prevState,
        isFocusShown: !prevState.isFocusShown,
      };
    case ACTIONS.CAPTURE_IMAGE:
      prevState.cameraRef.current.capture(action.payload.image);
      return {
        ...prevState,
        imageCaptured: true,
      };
    default:
      return prevState;
  }
}

const ThemeContext = React.createContext("light");
const SomeOtherContext = React.createContext("otherContext");

function ThemeComponent() {
  const theme = useContext(ThemeContext);
  const otherContext = useContext(SomeOtherContext);

  return <div> {theme + " " + otherContext}</div>;
}

function App() {
  let initCameraState = {
    isFrontCamera: false,
    isCameraOn: false,
    isFocusShown: false,
    cameraRef: useRef(null),
  };

  let [cameraState, cameraDispatch] = useReducer(
    cameraReducer,
    initCameraState
  );

  const [currentClassificationResult, classifyImage] = useClassifyImage(null);

  return (
    <div className="App">
      <h1> Our example camera web app </h1>
      {cameraState.isCameraOn ? (
        <Camera
          showFocus={false}
          front={cameraState.isFrontCamera}
          capture={classifyImage}
          ref={cameraState.cameraRef}
          width="800px"
          height="500px"
          btnColor="rgb(0,0,0,0)"
        />
      ) : null}
      <Button
        buttonText="Toggle Camera"
        onClick={() => {
          cameraDispatch({ type: ACTIONS.TOGGLE_CAMERA });
        }}
      />

      <Button
        buttonText="Change camera"
        onClick={() => {
          cameraDispatch({ type: ACTIONS.CHANGE_CAMERA });
        }}
      />
      <Button
        buttonText="Capture Image"
        onClick={(image) =>
          cameraDispatch({ type: ACTIONS.CAPTURE_IMAGE, payload: { image } })
        }
      />
      <Button
        buttonText="Show focus"
        onClick={() => {
          cameraDispatch({ type: ACTIONS.TOGGLE_FOCUS_SHOWN });
        }}
      />

      <ThemeContext.Provider value={"dark"}>
        <ThemeContext.Provider value={"blue"}>
          <ThemeComponent />
        </ThemeContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
