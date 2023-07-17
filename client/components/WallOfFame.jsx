import fakeData from "../../server/database/fakeData";
import WOFItem from "./WOFItem.jsx";

const WallOfFame = () => {

  const sortedUsers = fakeData.sort((a, b)=>{
    return b.points - a.points;
  });

  return (
    <div>
      <h2>Wall Of Fame</h2>
      {sortedUsers.map((user, index) => {
        return <WOFItem user={user} key={'user' + index}/>;
      })}
    </div>
  );
};

export default WallOfFame;
