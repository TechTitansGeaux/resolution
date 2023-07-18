import { useState, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';


const Home = () => {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [submit, setSubmit] = useState(false)

  dayjs.extend(relativeTime);
  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    async function fetchData() {
      await axios.post('/void', { text })
        .then((data) => {
          console.log('Success! handleSubmit post request data ==>', data);
          // empty input field
          setText("");
          setSubmit(false);
        })
        .catch((err) => {
          console.error('Error in handleSubmit axios.post request ===>', err)
      })
    }
    // calls async function
    fetchData()
  }

  useEffect(() => {
    // async function to get void table data
    async function fetchData() {
      await axios
        .get("/void")
        .then((response) => {
          // updates 'posts' state array with void table data
          setPosts(
            // sorts posts with the most recent at the top of void feed
            response.data.sort((a, b) =>
              b.createdAt > a.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
            )
          );
        })
        .catch((err) => {
          console.error("Error in useEffect axios.get request ===>", err);
        });
    }
    // calls async function
    fetchData()
    // runs useEffect every time handleSubmit function is invoked similar to componentDidMount()
  }, [submit])

  return (
    <div className="home section">
      <main className="container">
        <div className="intro">
          <h1 className="text-primary">Welcome to Resolution</h1>
          <p>
            This innovative app will change the way you resolve interpersonal
            conflict. Resolution offers multiple features for all of your
            conflict resolution needs. This app is a medium for you to express
            your emotions, communicate with others in a low pressure
            environment, and make decisions about how to move forward. Utilizing
            all that resolution has to offer will improve your relationships
            with others and your quality of life overall.
          </p>
        </div>
        <div className="scream-void-component">
          <div className="input-scream-container mb-3">
            <h2 className="text-primary">Scream into the Void</h2>
            <p>
              Do you need to vent? Often, this might be the first constructive
              way to deal with your conflict. Put words to your emotions, say
              your piece and get everything off your chest. All screams are
              anonymous.
            </p>
            <input
              name="scream"
              type="text"
              placeholder="Go Ahead and Vent"
              onChange={handleChange}
              onKeyDown={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
              value={text}
              className="input-group"
            ></input>
            <button
              className="btn btn-primary mt-2 pe-5 ps-5"
              onClick={(e) => handleSubmit(e)}
            >
              <b>SUBMIT</b>
            </button>
          </div>
          <div className="scream-container bg-primary container pt-2pb-2">
            {posts.map((post) => {
              return (
                <p
                  className="scream modal-content  text-white"
                  key={post.id + "void"}
                >
                  <span className="scream modal-content  text-sm-left">
                    anonymous:{" "}
                  </span>
                  <b>{`"${post.text}"`}</b>
                  <span> created: {dayjs(`${post.createdAt}`).fromNow()}</span>
                </p>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
