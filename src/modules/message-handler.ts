import { MsgDrowingTypes, MsgMouseTypes } from '../utils/msg-types';
import DuplexWsStream from '../utils/send-stream';
import DrawActions from './draw-actions';
import MouseActions from './mouse-actions';
import ScreenActions from './screen-actions';

class MessageHandler {
  private mouseActions = new MouseActions();

  private drawActions = new DrawActions();

  private screenActions = new ScreenActions();

  public handle(stream: DuplexWsStream, msg: string): void {
    const params = msg.split(' ');
    this.handleMouseTypes(stream, params, msg);
    this.handleDrawingTypes(stream, params, msg);
    if (msg === 'prnt_scrn') {
      this.screenActions.sendScreen(stream, msg);
    }
  }

  private handleMouseTypes(
    stream: DuplexWsStream,
    params: string[],
    msg: string,
  ): void {
    switch (params[0]) {
      case MsgMouseTypes.MouseUp:
        this.mouseActions.handleMouseUp(params);
        stream.push(msg);
        break;
      case MsgMouseTypes.MouseDown:
        this.mouseActions.handleMouseDown(params);
        stream.push(msg);
        break;
      case MsgMouseTypes.MouseLeft:
        this.mouseActions.handleMouseLeft(params);
        stream.push(msg);
        break;
      case MsgMouseTypes.MouseRight:
        this.mouseActions.handleMouseRight(params);
        stream.push(msg);
        break;
      case MsgMouseTypes.MousePosition:
        this.mouseActions.handleMousePosition(stream, params);
        break;
      default:
        break;
    }
  }

  private handleDrawingTypes(
    stream: DuplexWsStream,
    params: string[],
    msg: string,
  ): void {
    switch (params[0]) {
      case MsgDrowingTypes.DrawSircle:
        this.drawActions.drawCircle(params);
        stream.push(msg);
        break;
      case MsgDrowingTypes.DrawRectangle:
        this.drawActions.drawRectangle(params);
        stream.push(msg);
        break;
      case MsgDrowingTypes.DrawSquare:
        this.drawActions.drawSquare(params);
        stream.push(msg);
        break;
      default:
        break;
    }
  }
}

export default MessageHandler;
