import GoogleButton from "react-google-button";

const SignUp = () => {
  // redirect user to sign up page
  const redirectToGoogleSSO = () => {
    window.location.href = "http://127.0.0.1:4000/auth/login/google";
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="mb-4">Welcome To The Resolution App</h2>
          <div className="mb-3">
            <GoogleButton onClick={redirectToGoogleSSO} />
          </div>
          <p>Sign In with Google</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
