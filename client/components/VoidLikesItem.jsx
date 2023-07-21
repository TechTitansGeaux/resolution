import { useState } from "react";

const VoidLikesItem = ({ postLikes }) => {
  const [likes, setLikes] = useState(postLikes);

  return <div>{likes}</div>;
};

export default VoidLikesItem;
