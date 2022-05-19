import io from 'socket.io-client';

const initSocket = () => {
  const accessToken = localStorage.getItem("token");
  const url = 'https://hexfresh-socket.herokuapp.com';
  const socket = io(url as string, {
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

  // socket.off("receive message").on("receive message", (data) => {
  //   //nhan message
  //   console.log(data); 
  //   alert(data.message.data);
  // })

  return socket;
};

const socket = initSocket();
export const socketInstance = socket;