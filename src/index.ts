import { WebSocketServer } from 'ws';
import MessageHandler from './modules/message-handler';
import { httpServer } from './http_server/index';

const HTTP_PORT = 3000;
const WSS_PORT = 8080;
const msgHandler = new MessageHandler();

const wss = new WebSocketServer(
  {
    port: WSS_PORT,
  },
  () => {
    console.log(`Server started on ws://localhost:${WSS_PORT}`);
  },
);

wss.on('connection', (socket) => {
  socket.on('message', (data) => msgHandler.handle(socket, data.toString()));
});

wss.on('close', () => {
  console.log('Server was closed');
});

wss.on('error', (err) => {
  console.error(err);
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
