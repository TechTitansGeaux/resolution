import { useState } from "react";
const Home = () => {
  const [] = useState();
  return (
    <div>
      <main>
        <div className="intro">
          <h1>Welcome to Resolution</h1>
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
          <div className="input-scream-container">
            <h2>Scream into the Void</h2>
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
            ></input>
            <button>SUBMIT</button>
          </div>
          <div className="scream-container">
            <p className="scream">
              <span>Anonymous: </span>Demo Scream <span>Created at time</span>
            </p>
            <p className="scream">
              <span>Anonymous: </span>Demo Scream <span>Created at time</span>
            </p>
            <p className="scream">
              <span>Anonymous: </span>Demo Scream <span>Created at time</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
