import VoidScreamItem from "./VoidScreamItem.jsx";

const Void = ({ posts }) => {
  return (
    <div className="scream-container bg-primary container ps-3">
      {posts.map((post) => {
        return (
          <VoidScreamItem
            key={post.id + "void"}
            post={post}
            postLikes={post.likes}
          />
        );
      })}
    </div>
  );
};

export default Void;
