import net, { Socket } from 'net';

class UnixSocketClient {
  private socket: Socket;
  private socketPath: string;

  constructor(socketPath: string = '/tmp/unix.sock') {
    this.socketPath = socketPath;
    this.socket = new Socket();
    this.setupEventListeners();
  }

  public connect(): void {
    this.socket.connect(this.socketPath, () => {
      console.log('接続完了: サーバーに接続しました');
      this.socket.write('client.data');
    });
  }

  public disconnect(): void {
    this.socket.end();
  }

  private setupEventListeners(): void {
    this.socket.on('data', (data: Buffer) => {
      console.log(`データ受信: ${data.toString()}`);
      this.disconnect();
    });

    this.socket.on('end', () => {
      console.log('切断: サーバーから切断されました');
    });

    this.socket.on('error', (err: Error) => {
      console.error(`エラー: ${err.message}`);
    });
  }
}

const client = new UnixSocketClient();
client.connect();