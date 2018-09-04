import {createServer, Server} from 'http';
import {app} from './server';

const server: Server = createServer(app);

server.listen(3000, () => {
	console.log('Server listening on port 3000')
})

