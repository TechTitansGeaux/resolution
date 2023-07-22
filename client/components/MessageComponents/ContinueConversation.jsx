import { React, useState } from 'react';
import axios from 'axios';
import Conversation from './Conversation.jsx';

const ContinueConversation = (props) => {
  const { convoId, loggedIn, otherUser, updateView } = props;

  const [ topText, updateTopText ] = useState('');

  const [ bottomText, updateBottomText ] = useState('');

  const [ meme, changeMeme ] = useState('Aint-Nobody-Got-Time-For-That');

  const sendMessage = () => {
    axios.post('/messagesHandling/message', {
      senderId: loggedIn.id,
      recipientId: otherUser.id,
      conversationId: convoId,
      img: `https://apimeme.com/meme?meme=${meme}&top=${topText}&bottom=${bottomText}`.replaceAll(' ', '+')
    })
      .then((res) => {
        updateView(<Conversation
          convoId={convoId}
          loggedIn={loggedIn}
          otherUser={otherUser}
          updateView={updateView}
        />);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div>
      <div style={{ width: '47%', float: 'left' }}>
        <h3 className='text-primary'>select Meme</h3>
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
        <h3 className='text-primary'>enter top text</h3>
        <input className="form-control form-control-lg" value={topText} onChange={(e) => { updateTopText(e.target.value); }}></input>
        <h3 className='text-primary'>enter bottom text</h3>
        <input className="form-control form-control-lg" value={bottomText} onChange={(e) => { updateBottomText(e.target.value); }}></input>
        <h3 className='text-primary'>click to send meme to {otherUser.username}</h3>
        <button className='btn btn-primary' onClick={() => { sendMessage(); }}>send meme</button>
      </div>
      <div style={{ width: '47%', float: 'right' }}>
        <br></br>
        <br></br>
        <img
          src={`https://apimeme.com/meme?meme=${meme}&top=${topText}&bottom=${bottomText}`.replaceAll(' ', '+')}
          className='rounded'
        ></img>
      </div>
    </div>
  );
};

export default ContinueConversation;
