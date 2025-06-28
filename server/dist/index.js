import net from 'net';
import fs from 'fs';
const socketFile = '/tmp/unix.sock';
const server = net.createServer((c) => {
    console.log('client connected');
    c.on('end', () => {
        console.log('client disconnected');
    });
    c.on('data', (data) => {
        console.log(data.toString());
    });
    c.write('server.data');
    c.on('error', (err) => {
        console.error(err.message);
    });
});
const serverClose = () => {
    server.close(() => {
        try {
            fs.unlinkSync(socketFile);
        }
        catch (err) {
            // 例外を無視
        }
    });
};
server.listen(socketFile);
process.on('SIGINT', serverClose);
process.on('SIGTERM', serverClose);
//# sourceMappingURL=index.js.map