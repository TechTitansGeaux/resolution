import GoogleButton from 'react-google-button';
import ResolutionLogo from '../img/resolution_app_logo_mini.svg';

const SignUp = () => {
  // redirect user to sign up page
  const redirectToGoogleSSO = () => {
    window.location.href = `${process.env.HOST}/auth/login/google`;
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow p-3 rounded-lg border-0">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <h2 className="m-0 font-weight-bold">Resolution</h2>
              <img
                src={ResolutionLogo}
                alt="Resolution Logo"
                style={{ width: "auto", height: "2.5em", marginLeft: "10px" }}
                className='bounce-img'
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <GoogleButton onClick={redirectToGoogleSSO} />
              <pre>{process.env.HOST}</pre>
            </div>
            <p className="text-center">Welcome</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
