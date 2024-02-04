import { useState, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: 'Hello, I am your personal assistant',
      sender: 'ChatGPT',
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing',
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const simulateTypingEffect = (responseText) => {
    let currentText = '';
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: '', sender: 'ChatGPT' },
    ]);

    const typingInterval = setInterval(() => {
      if (currentText.length < responseText.length) {
        currentText += responseText[currentText.length];
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { message: currentText, sender: 'ChatGPT' },
        ]);
      } else {
        clearInterval(typingInterval);
        setTyping(false);
      }
    }, 20);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      query: apiMessages[apiMessages.length - 1].content,
    };

    const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
    const options = {
      method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '1630028237mshc01ab26c30a86c2p183e4djsnb93eff064633',
		'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
	},
      body: JSON.stringify(apiRequestBody),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      simulateTypingEffect(result.response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Initial welcome message
    simulateTypingEffect('');
  }, []);

  return (
    <div className='chatbot'>
      <div className='chatbots'>
        <div className='chat-container'>
          <div className='message-list'>
            {messages.map((message, i) => (
              <div key={i} className={`message ${message.sender}`}>
                {message.message}
              </div>
            ))}
            {typing && <div ></div>}
          </div>
          <div className='message-input'>
            <input
              type='text'
              placeholder='Type message here'
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSend(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
