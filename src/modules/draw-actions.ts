import robot from 'robotjs';

class DrawActions {
  private isDrawing = false;

  public drawCircle(params: string[]): void {
    if (this.isDrawing) return;
    this.isDrawing = true;

    const { x: x0, y: y0 } = robot.getMousePos();
    const radius = Number(params[1]);
    let angle = 0;
    const draw = function drawStep() {
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
      drawStep();
    };
    draw();
  }

  public drawRectangle(params: string[]): void {
    if (this.isDrawing) return;
    this.isDrawing = true;
  }

  public drawSquare(params: string[]): void {
    if (this.isDrawing) return;
    this.isDrawing = true;
  }
}

export default DrawActions;
