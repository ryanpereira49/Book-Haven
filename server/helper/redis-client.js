import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('[Redis]: ', err));

await client.connect();