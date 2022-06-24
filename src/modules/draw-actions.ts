import robot from 'robotjs';

class DrawActions {
  private isDrawing = false;

  public drawCircle(params: string[]): void {
    if (this.isDrawing) return;
    this.isDrawing = true;

    const { x: x0, y: y0 } = robot.getMousePos();
    const radius = Number(params[1]);
    let angle = 0;
    const draw = () => {
      if (angle > 360) {
        this.isDrawing = false;
        return;
      }
      const radian = (angle * Math.PI) / 180;
      const x = Math.round(x0 - radius * Math.cos(radian) + radius);
      const y = Math.round(y0 - radius * Math.sin(radian));
      angle += 1;
      robot.mouseClick();
      robot.dragMouse(x, y);
      draw();
    };
    draw();
  }

  public drawRectangle(params: string[]): void {
    console.log(this.isDrawing);
    if (this.isDrawing) return;
    this.isDrawing = true;

    const { x: x0, y: y0 } = robot.getMousePos();
    const a = Number(params[1]);
    const b = Number(params[2]);
    let dx = 0;
    let dy = 0;

    const draw = () => {
      if (dx < a && dy === 0) {
        dx += 1;
      } else if (dy < b && dx === a) {
        dy += 1;
      } else if (dx > 0 && dy === b) {
        dx -= 1;
      } else {
        dy -= 1;
      }

      robot.mouseClick();
      robot.moveMouseSmooth(x0 + dx, y0 + dy, 1);
      if (dx === 0 && dy === 0) {
        this.isDrawing = false;
        return;
      }
      draw();
    };
    draw();
  }

  public drawSquare(params: string[]): void {
    params.push(params[1]);
    this.drawRectangle(params);
  }
}

export default DrawActions;
