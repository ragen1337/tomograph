export const changeValueHandler = (setState) =>
  (event) => {
    setState(+event.target.value);
  };


export const drawLine = (ctx, x1, y1, x2, y2) => {
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
};