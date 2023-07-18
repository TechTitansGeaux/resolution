import WOFItem from "./WOFItem.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';

const WallOfFame = () => {

  // add top 5 property to state, empty string initially
  const [ top5, setTop5 ] = useState([]);

  //create function to get top 5 users
  useEffect(() => {
    //axios get request
    axios.get('/wofRoutes/users')
      // destructure to get data (array of top 5) from response
      .then(({data}) => {
        // set top5 in state to top5 given from axios
        setTop5(data);
      })
      .catch((err) => {
        console.error('Failed axios GET top 5: ', err);
      });
  }, []);


  return (
    <div>
      <h2>Wall Of Fame</h2>
      {top5.map((user, index) => {
        return <WOFItem user={user} key={'user' + index}/>;
      })}
    </div>
  );
};

export default WallOfFame;
