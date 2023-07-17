import { React, useState } from 'react';
import axios from 'axios';

const Messages = () => {

  const [ topText, updateTopText ] = useState('');

  const [ bottomText, updateBottomText ] = useState('');

  const [ meme, changeMeme ] = useState('Aint-Nobody-Got-Time-For-That');



  return (
    <div>
      <h3>select Meme</h3>
      <select id='memes' onChange={(e) => { changeMeme(e.target.value); }}>
        <option value='Aint-Nobody-Got-Time-For-That'>Ain't Nobody Got Time For That</option>
        <option value='1990s-First-World-Problems'>1990's First World Problems</option>
        <option value='Angry-Baby'>Angry Baby</option>
        <option value='Confused-Granddad'>Confused Granddad</option>
        <option value='Feels-Bad-Frog---Feels-Bad-Man'>Sad Pepe</option>
      </select>
      <h3>enter top text</h3>
      <input value={topText} onChange={(e) => { updateTopText(e.target.value); }}></input>
      <h3>enter bottom text</h3>
      <input value={bottomText} onChange={(e) => { updateBottomText(e.target.value); }}></input>
      <h3>enter username to send to</h3>
      <input></input>
      <h3>click to send meme</h3>
      <button>send</button>
      <br></br>
      <br></br>
      <img src={`https://apimeme.com/meme?meme=${meme}&top=${topText}&bottom=${bottomText}`}></img>
    </div>
  );
};

export default Messages;
