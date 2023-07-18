const WOFItem = (props) => {
  return (
    <li>{props.user.username} ......... {props.user.points} points! {props.user.trophy}</li>
  );
};

export default WOFItem;
