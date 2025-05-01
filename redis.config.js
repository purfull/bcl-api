const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: '127.0.0.1', // or your Redis server IP
        port: 6380         // change to the desired port
    }
}
);

client.on('error', (err) => console.error('Redis Error:', err));
client.connect();

module.exports = client;
