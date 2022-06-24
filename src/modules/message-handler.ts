import { WebSocket } from 'ws';
import { MsgDrowingTypes, MsgMouseTypes } from '../utils/msg-types';
import DrawActions from './draw-actions';
import MouseActions from './mouse-actions';

class MessageHandler {
  private mouseActions = new MouseActions();

  private drawActions = new DrawActions();

  public handle(socket: WebSocket, msg: string): void {
    const params = msg.split(' ');
    console.log('', msg);
    this.handleMouseTypes(socket, params, msg);
    this.handleDrawingTypes(socket, params, msg);
  }

  private handleMouseTypes(
    socket: WebSocket,
    params: string[],
    msg: string,
  ): void {
    switch (params[0]) {
      case MsgMouseTypes.MouseUp:
        this.mouseActions.handleMouseUp(params);
        socket.send(msg);
        break;
      case MsgMouseTypes.MouseDown:
        this.mouseActions.handleMouseDown(params);
        socket.send(msg);
        break;
      case MsgMouseTypes.MouseLeft:
        this.mouseActions.handleMouseLeft(params);
        socket.send(msg);
        break;
      case MsgMouseTypes.MouseRight:
        this.mouseActions.handleMouseRight(params);
        socket.send(msg);
        break;
      case MsgMouseTypes.MousePosition:
        this.mouseActions.handleMousePosition(socket, params);
        break;
      default:
        break;
    }
  }

  private handleDrawingTypes(
    socket: WebSocket,
    params: string[],
    msg: string,
  ): void {
    switch (params[0]) {
      case MsgDrowingTypes.DrawSircle:
        this.drawActions.drawCircle(params);
        socket.send(msg);
        break;
      case MsgDrowingTypes.DrawRectangle:
        this.drawActions.drawRectangle(params);
        socket.send(msg);
        break;
      case MsgDrowingTypes.DrawSquare:
        this.drawActions.drawSquare(params);
        socket.send(msg);
        break;
      default:
        break;
    }
  }
}

export default MessageHandler;
