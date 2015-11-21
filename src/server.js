import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => {
      console.log('a change has occured in Store');

      io.emit('state', store.getState().toJS()
    })
  );
}
