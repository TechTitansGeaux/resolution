import { React, useState } from 'react';
import axios from 'axios';
import AllConversations from './AllConversations.jsx';

const StartConversation = (props) => {
  const { loggedIn, updateView } = props;

  const [ topText, updateTopText ] = useState('');

  const [ bottomText, updateBottomText ] = useState('');

  const [ userExists, setUserExists ] = useState('');

  const [ meme, changeMeme ] = useState('Aint-Nobody-Got-Time-For-That');

  const [ recipient, setRecipient ] = useState(null);

  const getRecipient = (username) => {
    axios.get(`http://127.0.0.1:4000/messagesHandling/user${username}`)
      .then((res) => {
        if (res.status === 204) {
          setUserExists('user not found');
        } else if (res.status === 200) {
          setRecipient(res.data);
          // maybe put a check mark emoji
          setUserExists('all good');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = () => {
    axios.post('http://127.0.0.1:4000/messagesHandling/message', {
      senderId: loggedIn.id,
      recipientId: recipient.id,
      img: `https://apimeme.com/meme?meme=${meme}&top=${topText}&bottom=${bottomText}`.replaceAll(' ', '+')
    })
      .then(() => {
        updateView(<AllConversations loggedIn={props.loggedIn} />);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>enter username to send to</h3>
      <input onChange={(e) => { getRecipient(e.target.value); }}></input>
      <h5>{ userExists }</h5>
      <h3>select Meme</h3>
      <select id='memes' onChange={(e) => { changeMeme(e.target.value); }}>
        <option value='Aint-Nobody-Got-Time-For-That'>Ain't Nobody Got Time For That</option>
        <option value='Angry-Baby'>Angry Baby</option>
        <option value='Confused-Granddad'>Confused Granddad</option>
        <option value='Finn-The-Human'>Finn The Human Rage</option>
        <option value='Gasp-Rage-Face'>Gasp Rage Face</option>
        <option value='Grumpy-Toad'>Grumpy Toad</option>
        <option value='Frustrated-Boromir'>Frustrated Boromir</option>
        <option value='Futurama-Fry'>Futurama Fry</option>
        <option value='Hercules-Hades'>Hercules Hades</option>
        <option value='Hillary-Clinton'>Happy Hillary Clinton</option>
        <option value='Happy-Guy-Rage-Face'>Happy Guy Crying Face</option>
        <option value='Hard-To-Swallow-Pills'>Hard To Swallow Pills</option>
        <option value='Hipster-Ariel'>Hipster Ariel</option>
        <option value='Ill-Have-You-Know-Spongebob'>Ill Have You Know Spongebob</option>
        <option value='Morty'>Morty</option>
        <option value='Mr-Krabs-Blur-Meme'>Mr Krabs Blur Meme</option>
        <option value='1990s-First-World-Problems'>1990's First World Problems</option>
      </select>
      <h3>enter top text</h3>
      <input value={topText} onChange={(e) => { updateTopText(e.target.value); }}></input>
      <h3>enter bottom text</h3>
      <input value={bottomText} onChange={(e) => { updateBottomText(e.target.value); }}></input>
      <h3>click 'send meme' button to start conversation</h3>
      <button onClick={() => { sendMessage(); }}>send meme</button>
      <br></br>
      <br></br>
      <img src={`https://apimeme.com/meme?meme=${meme}&top=${topText}&bottom=${bottomText}`.replaceAll(' ', '+')}></img>
    </div>
  );
};

export default StartConversation;
