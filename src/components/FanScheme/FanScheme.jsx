import styles from './FanScheme.module.css';
import {useEffect, useRef, useState} from "react";
import {changeValueHandler,drawLine} from "../../utils";

export const FanScheme = () => {
  const canvasRef = useRef(null);

  const [canvasRefState, setCanvasRefState] = useState();

  const [radiusState, setRadiusState] = useState(0);
  const [viewsNumberState, setViewsNumberState] = useState(0);
  const [sensorsNumberState, setSensorsNumberState] = useState(0);
  const [angleBetweenSensorsState, setAngleBetweenSensorsState] = useState(0);

  useEffect(() => {
    setCanvasRefState(canvasRef);
  }, []);

  const submitHandler = () => {
    const context = canvasRefState.current.getContext('2d');
    context.clearRect(0, 0, canvasRefState.current.width, canvasRefState.current.height);

    context.beginPath();
    context.arc(canvasRefState.current.width/2,canvasRefState.current.height/2, radiusState,0,Math.PI*2,true);
    context.stroke();

    let sensorsNumbers = [];
    for( let i = -(sensorsNumberState - 1)/2, j = 0 ; i <= (sensorsNumberState - 1)/2; i++, j++) {
      sensorsNumbers[j] = i;
    }

    sensorsNumbers.forEach((sensorNumber) => {
      for( let m = 0; m <= viewsNumberState; m++) {
        let fi = (2 * Math.PI * m) / viewsNumberState;
        let beta = angleBetweenSensorsState;
        if (angleBetweenSensorsState * sensorNumber <= Math.PI / 4)
          beta = angleBetweenSensorsState * sensorNumber;

        let discriminant = 4 * radiusState * radiusState * (Math.sin(beta) ** 2)
          * (Math.sin(beta + fi) ** 2) - 4 * radiusState * radiusState *
          ((Math.sin(beta) ** 2) - (Math.cos(beta + fi) ** 2));

        let x1 = (-2 * radiusState * Math.sin(beta) * Math.sin(beta + fi) + Math.sqrt(discriminant)) / 2;
        let y1 = (x1 * Math.sin(beta + fi) + radiusState * Math.sin(beta)) / Math.cos(beta + fi);

        let x2 = (-2 * radiusState * Math.sin(beta) * Math.sin(beta + fi) - Math.sqrt(discriminant)) / 2;
        let y2 = (x2 * Math.sin(beta + fi) + radiusState * Math.sin(beta)) / Math.cos(beta + fi);

        drawLine( context, x1 + 300, y1 + 300, x2 + 300, y2 + 300);
        console.log('loading');
      }
    });
  }

  return (
    <div className={styles.fanSchemeWrapper}>
      <div className={styles.canvasWrapper}>
        <canvas id="canvas" width="600" height="600" ref={canvasRef}>
        </canvas>
      </div>
      <div className={styles.interfaceWrapper}>
        <span>Радиус(R)</span>
        <input type="text" onChange={changeValueHandler(setRadiusState)} />

        <span>Количество ракурсов(M)</span>
        <input type="text" onChange={changeValueHandler(setViewsNumberState)} />

        <span>Количество датчиков(N)</span>
        <input type="text" onChange={changeValueHandler(setSensorsNumberState)} />

        <span>Угол между прямыми(beta)</span>
        <input type="text" onChange={changeValueHandler(setAngleBetweenSensorsState)} />

        <button onClick={submitHandler}>Нарисовать томограф</button>
      </div>
    </div>
  );
}