import Server from 'socket.io';

function serializeState(store) {
  return store.getState().toJS();
}

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(() => {
    console.log('a change has occured in Store');

    io.emit('state', serializeState(store));
  });

  io.on('connection', (socket) => {
    console.log('a client has been connected');

    socket.emit('state', serializeState(store));

    socket.on('action', store.dispatch.bind(store));
  });
}
