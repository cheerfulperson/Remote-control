import robot from 'robotjs';
import { WebSocket } from 'ws';

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

  public handleMousePosition(socket: WebSocket, params: string[]): void {
    const dataToSend = `${params[0]} ${this.x},${this.y}`;
    console.log(dataToSend);

    socket.send(dataToSend, (err) => {
      if (err) console.error(err);
    });
  }
}

export default MouseActions;
