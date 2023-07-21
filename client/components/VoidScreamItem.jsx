import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const VoidScreamItem = ({ post, postLikes }) => {
  // SETS RELATIVE TIME WITH DAYJS
  dayjs.extend(relativeTime);
  const [likes, setLikes] = useState(postLikes);

  // // INCREMENTS VOID LIKES STATE ARRAY & UPDATES A SPECIFIC SCREAM VIA CLICKED POST
  const handleIncrementLikes = (post) => {
    const fetchData = async () => {
      // filters voidLikes state array and adds 1 to likes value
      const incrementCurrPostLikes = post.likes + 1;
      await axios
        .put(`/void/${post.id}`, { likes: incrementCurrPostLikes })
        .then((response) => {
          console.log("PUT request response", response);
          setLikes(likes + 1);
        })
        .catch((err) => {
          console.error("ERROR in axios put request at handleLikeClick: ", err);
        });
    };
    fetchData();
  };

  return (
    <div id={post.id}>
      <p className="scream modal-content  text-white pt-3">
        <span className="scream modal-content  text-sm-left">anonymous: </span>
        <b>{`"${post.text}"`}</b>
        <span> created: {dayjs(`${post.createdAt}`).fromNow()}</span>
      </p>
      <button
        className="btn btn-light round-btn"
        onClick={() => handleIncrementLikes(post)}
      >
        💯{" "}
        <span className="likes">
          <div>{likes}</div>
        </span>
      </button>
      <hr></hr>
    </div>
  );
};

export default VoidScreamItem;
