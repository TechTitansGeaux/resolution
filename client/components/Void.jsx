import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Void = ({ posts }) => {
  dayjs.extend(relativeTime);

  const [voidLikes, setVoidLikes] = useState([]); // i.e. [ { id: 1, likes: 0},  { id: 2, likes: 4}]
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0); // forces a rerender 1 more time on useEffect

  // USE EFFECT TO GET VOID ON COMPONENT MOUNT
  const getVoid = async () => {
    const request = await axios.get("/void");
    setVoidLikes(
      request.data.map((scream) => {
        return { id: scream.id, likes: scream.likes };
      })
    );
  };

  useEffect(() => {
    getVoid();
  }, [reducerValue]);

  // INCREMENTS VOID LIKES STATE ARRAY & UPDATES A SPECIFIC SCREAM VIA CLICKED POST
  const handleIncrementLikes = (post) => {
    const fetchData = async () => {
      // filters voidLikes state array and adds 1 to likes value
      const incrementCurrPostLikes =
      voidLikes.filter((obj) => obj.id === post.id)[0].likes + 1;
      await axios
      .put(`/void/${post.id}`, { likes: incrementCurrPostLikes })
      .then((response) => {
        console.log("PUT request response", response);
      })
      .catch((err) => {
        console.error("ERROR in axios put request at handleLikeClick: ", err);
      });
    };
    fetchData();
    forceUpdate();
  };

  return (
    <div className="scream-container bg-primary container ps-3">
      {posts.map((post) => {
        return (
          <div key={post.id + "void"} id={post.id}>
            <p className="scream modal-content  text-white pt-3">
              <span className="scream modal-content  text-sm-left">
                anonymous:{" "}
              </span>
              <b>{`"${post.text}"`}</b>
              <span> created: {dayjs(`${post.createdAt}`).fromNow()}</span>
            </p>
            <button
              className="btn btn-light round-btn"
              onClick={() => handleIncrementLikes(post)}
            >
              💯{" "}
              <span className="likes">
                {voidLikes.filter((obj) => obj.id === post.id)[0].likes}
              </span>
            </button>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default Void;
