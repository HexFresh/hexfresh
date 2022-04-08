import io from 'socket.io-client';

export const initSocket = (accessToken: string) => {
  const socket = io('https://hexfresh-gamification-backend.herokuapp.com', {
    transports: ['websocket'],
    query: { token: accessToken },
  });
  socket.on('ping', (data) => {
    alert(data);
  });
  socket.on('refetch notification', (data) => {
    const alertData = `
            title: ${data[0].title}\n
            body: ${data[0].body}\n
            time: ${data[0].createdAt}
        `;
    console.log(data);
    alert(alertData);
    // To do: implement refetch & update notification
  });
  return socket;
};
