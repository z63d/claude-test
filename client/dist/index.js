import { Socket } from 'net';
class UnixSocketClient {
    constructor(socketPath = '/tmp/unix.sock') {
        this.socketPath = socketPath;
        this.socket = new Socket();
        this.setupEventListeners();
    }
    connect() {
        this.socket.connect(this.socketPath, () => {
            console.log('接続完了: サーバーに接続しました');
            this.socket.write('client.data');
        });
    }
    disconnect() {
        this.socket.end();
    }
    setupEventListeners() {
        this.socket.on('data', (data) => {
            console.log(`データ受信: ${data.toString()}`);
            this.disconnect();
        });
        this.socket.on('end', () => {
            console.log('切断: サーバーから切断されました');
        });
        this.socket.on('error', (err) => {
            console.error(`エラー: ${err.message}`);
        });
    }
}
const client = new UnixSocketClient();
client.connect();
//# sourceMappingURL=index.js.map