import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8888/ws');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected:', frame);
      client.subscribe('/topic/messages', (message) => {
        const receivedMessage = JSON.parse(message.body);

        setMessages((prevMessages) => {
          const isDuplicate = prevMessages.some((msg) => msg.content === receivedMessage.content);
          if (!isDuplicate) {
            return [...prevMessages, receivedMessage];
          }
          return prevMessages;
        });
      });
    }, (error) => {
      console.error('STOMP Error:', error);
    });

    setStompClient(client);
    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient) {
      console.log('Sending message:', message);
      const chatMessage = { content: message };

      // Gọi `stompClient.send` chỉ khi client đã kết nối
      if (stompClient && stompClient.connect) {
        stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      }
      setMessage(''); // Reset input field after sending
    } else {
      console.error('STOMP Client is not connected or message is empty.');
    }
  }

  return (
    <div>
      <h2>Thông báo mới</h2>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập thông báo"
        />
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
        <button onClick={sendMessage}>Send</button>
      </ul>
    </div>
  );
};

export default NotificationComponent;
