import { Duplex } from 'stream';
import { createWebSocketStream, WebSocket } from 'ws';

class DuplexWsStream {
  private stream: Duplex;

  public constructor(socket: WebSocket) {
    this.stream = createWebSocketStream(socket, {
      autoDestroy: true,
      defaultEncoding: 'utf8',
      encoding: 'utf-8',
      decodeStrings: true,
    });
  }

  public launch(cb: (msg: string) => void): void {
    this.stream.on('data', (chunk) => {
      const data: string = chunk.toString();
      console.log('from:', chunk);

      cb(data);
    });

    this.stream.on('error', (err) => {
      console.log(err);
    });

    this.stream.on('close', () => {
      console.log('The duplex channel has closed');
    });
  }

  public push(data: string): void {
    console.log('to:', data);
    this.stream.setEncoding('utf-8');
    this.stream.setDefaultEncoding('utf-8');

    this.stream._write(data, 'utf-8', (err) => {
      if (err) console.log(err);
    });
  }
}

export default DuplexWsStream;
