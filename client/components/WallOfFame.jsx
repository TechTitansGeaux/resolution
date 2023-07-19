import WOFItem from "./WOFItem.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';

const WallOfFame = () => {

  // add top 5 property to state, empty array initially
  const [ top5, setTop5 ] = useState([]);

  // useEffect hook to get top 5 users and update state
  useEffect(() => {
    //axios get request
    axios.get('/wofRoutes/users')
      // destructure to get data (array of top 5) from response
      .then(({data}) => {
        // set top5 in state to top5 given from axios
        setTop5(data.slice(0, 5));
      })
      .catch((err) => {
        console.error('Failed axios GET top 5: ', err);
      });
  }, []);

  return (
    <div className='section container'>
      <h2>Wall Of Fame</h2>
      {top5.map((user, index) => {
        return <WOFItem user={user} key={'user' + index}/>;
      })}
    </div>
  );
};

export default WallOfFame;
