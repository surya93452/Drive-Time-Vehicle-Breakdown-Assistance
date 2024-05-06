import { useState } from 'react'
import Parser from 'html-react-parser'
import chatIcon from '../images/chatbox-icon.svg';
import './dashboard.css';

import { Link } from "react-router-dom";


function Dashboard() {
  
  
    const [displaychatBox, setDisplayChatBox] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    const callApi = async () => {
      const msgs = [];
      msgs.push({ isSender: true, message });
      const response = await fetch('/predict', {
        method: 'POST',
        body: JSON.stringify({ message: message}),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
      });
  
      const result =  await response.json();
      console.log("Response from chatbot - ", result.answer);
      msgs.push({ isSender: false, message:  result.answer });
      setMessages([...messages, ...msgs]);
      setMessage('');
    }
  
    const showPopup = () => {
      setDisplayChatBox(!displaychatBox);
    }
  
    const sendMessage = () => {
      callApi();
    }
  
    const onChangeMessage = (event) => {
      setMessage(event.target.value);
    }
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        sendMessage();
      }
      
      
    }
    return (
        
        <div>
          <div className="mechanic">
          <Link className="mechanic"to="/mechanic-login"><i className="fa fa-wrench" />Are you a Mechanic?</Link>
          </div>

            {/* <Header /> */}
        <section id="home" class="home">
            <div class="home-content">

                <p>
                    Drive Time Vehicle Breakdown Assistance, your reliable companion on road. <br />
                    When your vehicle encounters unexpected <span class="caution"> troubles like flat tires or engine breakdown </span>, <span class="word"> our website
                    is your instant solution.</span>
                    Embark on worry-free journeys with Drive Time Vehicle Breakdown Assistance, your trusted companion on the road. 
                    We understand that unexpected troubles like flat tires or engine breakdowns can disrupt your travel plans. 
                    That's why our website is here to be your instant solution, offering reliable assistance when you need it the most. 
                    Whether you're commuting to work or heading out on a road trip, Drive Time is dedicated to providing swift and efficient support, 
                    ensuring you get back on the road with minimal delays. Drive confidently, knowing that help is just a click away with Drive Time Vehicle Breakdown Assistance.
                </p>
               
            </div>
            </section>
            

            {/* <Footer /> */}
      <div class="container">
      <div class="chatbox">
        <div className={`chatbox__support ${displaychatBox && 'chatbox--active'}`}>
            <div class="chatbox__header">
                <div class="chatbox__image--header">
                  <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt=""/>
                </div>
                <div class="chatbox__content--header">
                    <h4 class="chatbox__heading--header">Chat support</h4>
                    <p class="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
                </div>
            </div>
            <div class="chatbox__messages">
              {messages && [...messages].reverse().map((messageItem) => {
                  if(messageItem.isSender) {
                    return (
                      <div className="messages__item messages__item--operator">{messageItem.message}</div>
                    )
                  }
                  return (
                    <div className="messages__item messages__item--visitor">{Parser(messageItem.message)}</div>
                  )
                })
              }
            </div>
            <div class="chatbox__footer">
                <input type="text" placeholder="Write a message..." value={message} onChange={onChangeMessage} onKeyUp={handleKeyPress}/>
                <button class="chatbox__send--footer send__button" onClick={sendMessage}><i className="fa fa-paper-plane-o" />Send</button>
            </div>
        </div>
        <div class="chatbox__button">
            <button type="button" onClick={showPopup}><img src={chatIcon} alt="" /></button>
        </div>
      </div>
    </div>
    </div>
   
                   
  );
}

export default Dashboard;
