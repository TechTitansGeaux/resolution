import { React, useState } from 'react';

const Landing = (props) => {

  return (
    <div>
      <h1 className="text-primary">Welcome to Meme Messenger!</h1>
      <p> Our hand picked selection of memes that we provide offer a wide range of emotion to
        help better convey how you feel. If you're upset, feel free to make that know, but don't
        forget to have fun! Start up a conversation by clicking start conversations or see your
        previous conversations by clicking all conversations.
      </p>
      <img className='img-fluid rounded' src='https://apimeme.com/meme?meme=Albert-Cagestein&top=Revolutionary&bottom=Conflict+Resolution'></img>
    </div>
  );

};

export default Landing;
