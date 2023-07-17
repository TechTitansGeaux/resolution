import { React, useState } from 'react';
import axios from 'axios';

const Messages = () => {

  const [ topText, updateTopText ] = useState('');

  const updateBottomText = () => {

  };

  return (
    <div>
      <h3>select image</h3>
      <select name='cars' id='cars'>
        <option value='Aint nobody got time for that'>Ain't nobody got time for that</option>
        <option value='saab'>Saab</option>
        <option value='opel'>Opel</option>
        <option value='audi'>Audi</option>
      </select>
      <h3>enter top text</h3>
      <input value={topText} onChange={(e) => { updateTopText(e.target.value); }}></input>
      <h3>enter bottom text</h3>
      <input></input>
      <h3>enter username to send to</h3>
      <input></input>
      <h3>click to send meme</h3>
      <button>send</button>
      <br></br>
      <br></br>
      <img src='https://apimeme.com/meme?meme=Aint-Nobody-Got-Time-For-That&top=test&bottom=test'></img>
    </div>
  );
};

export default Messages;
