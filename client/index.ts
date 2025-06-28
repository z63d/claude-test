import net from 'net';

const client = net.createConnection('/tmp/unix.sock', () => {
  console.log('connected to server');
  client.write('client.data');
});

client.on('data', (data: Buffer) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});

client.on('error', (err: Error) => {
  console.error(err.message);
});