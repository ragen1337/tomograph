import {useEffect, useRef, useState} from "react";

import {changeValueHandler, drawLine} from '../../utils';

import styles from './ParallelScheme.module.css';

export const ParallelScheme = () => {
  const canvasRef = useRef(null);

  const [canvasRefState, setCanvasRefState] = useState();

  const [radiusState, setRadiusState] = useState(0);
  const [viewsNumberState, setViewsNumberState] = useState(0);
  const [sensorsNumberState, setSensorsNumberState] = useState(0);
  const [distanceBetweenSensorsState, setDistanceBetweenSensorsState] = useState(0);

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
        let fi = Math.PI * m / viewsNumberState;
        let discriminant = ((2 * sensorNumber * distanceBetweenSensorsState * Math.sin(fi)) **  2)
          - 4 * (((sensorNumber * distanceBetweenSensorsState) ** 2) - radiusState * radiusState * Math.cos(fi) * Math.cos(fi));

        let x1 = (-(2 * Math.sin(fi) * sensorNumber * distanceBetweenSensorsState) + Math.sqrt(discriminant)) / 2;
        let y1 = (sensorNumber * distanceBetweenSensorsState + x1 * Math.sin(fi)) / Math.cos(fi);

        let x2 = (-(2 * Math.sin(fi) * sensorNumber * distanceBetweenSensorsState) - Math.sqrt(discriminant)) / 2;
        let y2 = (sensorNumber * distanceBetweenSensorsState + x2 * Math.sin(fi)) / Math.cos(fi);

        if (viewsNumberState % 2 === 0)
        {
          drawLine( context, x1 + 300, y1 + 300, x2 + 300, y2 + 300);
          drawLine( context, y1 + 300, x1 + 300, y2 + 300, x2 + 300);
        }
        else
          drawLine( context, x1 + 300, y1 + 300, x2 + 300, y2 + 300);
        console.log('loading');
      }
    });
  }

  return (
    <div className={styles.parallelSchemeWrapper}>
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

        <span>Расстояние между соседними датчиками(h)</span>
        <input type="text" onChange={changeValueHandler(setDistanceBetweenSensorsState)} />

        <button onClick={submitHandler}>Нарисовать томограф</button>
      </div>
    </div>
  );
}