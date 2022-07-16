import robot from 'robotjs';
import DuplexWsStream from '../utils/send-stream';

class MouseActions {
  private get x(): number {
    return robot.getMousePos().x;
  }

  private get y(): number {
    return robot.getMousePos().y;
  }

  public handleMouseUp(params: string[]): void {
    robot.moveMouse(this.x, this.y - Number(params[1]));
  }

  public handleMouseDown(params: string[]): void {
    robot.moveMouse(this.x, this.y + Number(params[1]));
  }

  public handleMouseLeft(params: string[]): void {
    robot.moveMouse(this.x - Number(params[1]), this.y);
  }

  public handleMouseRight(params: string[]): void {
    robot.moveMouse(this.x + Number(params[1]), this.y);
  }

  public handleMousePosition(stream: DuplexWsStream, params: string[]): void {
    const dataToSend = `${params[0]} ${this.x},${this.y}`;

    stream.push(dataToSend);
  }
}

export default MouseActions;
