import net from 'net';

const client = net.createConnection('/tmp/unix.sock', () => {
  console.log('connected to server');
  client.write('client.data');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});

client.on('error', (err) => {
  console.error(err.message);
});
