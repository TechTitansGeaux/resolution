import React from 'react';

const WOFItem = (props) => {
  return (
    <li>{props.user.username} ......... {props.user.points} points!</li>
  );
};

export default WOFItem;
