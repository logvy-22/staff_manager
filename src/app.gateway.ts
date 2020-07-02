import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(80)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private users: { socket: Socket; id: string }[] = [];

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  handleDisconnect(client: Socket) {
    const clientIndex = this.users.findIndex(
      user => user.socket.id === client.id,
    );
    this.users.splice(clientIndex, 1);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.id;
    this.users.push({ socket: client, id: userId });
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(args);
  }
}
