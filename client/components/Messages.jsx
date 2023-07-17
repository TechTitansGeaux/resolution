import { React, useState } from 'react';
import axios from 'axios';

const Messages = () => {

  const [ topText, updateTopText ] = useState('');

  const [ bottomText, updateBottomText ] = useState('');

  const [ meme, changeMeme ] = useState('Grumpy-Toad');



  return (
    <div>
      <h3>select Meme</h3>
      <select id='memes' onChange={(e) => { changeMeme(e.target.value); }}>
        <option value='Aint-Nobody-Got-Time-For-That'>Ain't Nobody Got Time For That</option>
        <option value='1990s-First-World-Problems'>1990's First World Problems</option>
        <option value='Angry-Baby'>Angry Baby</option>
        <option value='Confused-Granddad'>Confused Granddad</option>
        <option value='Finn-The-Human'>Finn The Human Rage</option>
        <option value='Gasp-Rage-Face'>Gasp Rage Face</option>
        <option value='Frustrated-Boromir'>Frustrated Boromir</option>
        <option value='Futurama-Fry'>Futurama Fry</option>
        <option value='Grumpy-Toad'>Grumpy Toad</option>
        <option value='Hercules-Hades'>Hercules Hades</option>
        <option value='Hillary-Clinton'>Happy Hillary Clinton</option>
        <option value='Happy-Guy-Rage-Face'>Happy Guy Crying Face</option>
        <option value='Hard-To-Swallow-Pills'>Hard To Swallow Pills</option>
        <option value='Hipster-Ariel'>Hipster Ariel</option>
        <option value='Ill-Have-You-Know-Spongebob'>Ill Have You Know Spongebob</option>
        <option value='Morty'>Morty</option>
        <option value='Mr-Krabs-Blur-Meme'>Mr Krabs Blur Meme</option>

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
