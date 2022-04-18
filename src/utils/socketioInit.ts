import io from 'socket.io-client';
import { Widget, addResponseMessage } from 'react-chat-widget';

const initSocket = () => {
  const accessToken = localStorage.getItem("token");
  const url = process.env.REACT_APP_CHAT_SERVER_URL || 'https://hexfresh-gamification-backend.herokuapp.com';
  const socket = io(url, {
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

  socket.off("receive message").on("receive message", (message) => {
    //nhan message
    addResponseMessage(message.data);
  })

  return socket;
};

const socket = initSocket();
export const socketInstance = socket;