import { useState, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const Home = () => {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [submit, setSubmit] = useState(false);

  dayjs.extend(relativeTime);
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const fetchData = async () => {
      await axios.post('/void', { text })
        .then((data) => {
          console.log('Success! handleSubmit post request data ==>', data);
          // empty input field
          setText("");
          setSubmit(false);
        })
        .catch((err) => {
          console.error('Error in handleSubmit axios.post request ===>', err);
        });
    };
    // calls async function
    fetchData();
  };

  useEffect(() => {
    // async function to get void table data
    const fetchData = async () => {
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
    };
    // calls async function
    fetchData();
    // runs useEffect every time handleSubmit function is invoked similar to componentDidMount()
  }, [submit]);

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
        <hr></hr>
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
          <div className="scream-container bg-primary container ps-3 pt-3 pb-2">
            {posts.map((post) => {
              return (
                <p
                  className="scream modal-content  text-white pt-3"
                  key={post.id + "void"}
                >
                  <span className="scream modal-content  text-sm-left">
                    anonymous:{" "}
                  </span>
                  <b>{`"${post.text}"`}</b>
                  <span> created: {dayjs(`${post.createdAt}`).fromNow()}</span>
                  <hr></hr>
                </p>
              );
            })}
          </div>
        </div>
        <hr></hr>
        <div className="messenger-intro">
          <h2 className="text-primary">Meme Messenger</h2>
          <p>
            Do you have something you need to say, but just can’t find the right
            way to say it? We offer a convenient and expressive meme generator
            to help communicate your feelings to others in a light-hearted way.
            It might be tough to say what needs to be said; why not break the
            ice with a meme.
          </p>
        </div>
        <hr></hr>
        <div className="decision-maker-intro">
          <h2 className="text-primary">Decision Maker</h2>
          <p>
            Are you ready to move forward with your conflict, but need an
            unbiased way to decide how? Our decision maker feature offers a
            fair, neutral answer. Through a game of rock, paper, scissors, you
            and your opponent will be able to come to a concrete decision.
          </p>
        </div>
        <hr></hr>
        <div className="wall-of-fame-intro">
          <h2 className="text-primary">Wall of Fame</h2>
          <p>
            Earn points and trophies as you become a master conflict resolver!
            Our top 10 Resolution users will be featured on the Wall of Fame.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
