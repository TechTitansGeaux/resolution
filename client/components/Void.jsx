import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Void = ({ posts, handleIncrementLikes }) => {
  return (
    <div className="scream-container bg-primary container ps-3 pt-3 pb-2">
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
              onClick={handleIncrementLikes}
            >
              💯 <span className="likes">{post.likes}</span>
            </button>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default Void;