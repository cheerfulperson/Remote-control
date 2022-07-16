import robot from 'robotjs';
import Jimp from 'jimp';
import DuplexWsStream from '../utils/send-stream';

class ScreenActions {
  public sendScreen(stream: DuplexWsStream, msg: string): void {
    const { x, y } = robot.getMousePos();
    const bitImage: robot.Bitmap = robot.screen.capture(
      x + 100,
      y - 100,
      200,
      200,
    );
    new Jimp({
      data: bitImage.image,
      width: bitImage.width,
      height: bitImage.height,
    })
      .getBase64Async(Jimp.MIME_PNG)
      .then((base64: string) => {
        const data = `${msg} ${base64.split('base64,')[1]}`;
        stream.push(data);
      });
  }
}

export default ScreenActions;
