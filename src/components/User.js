import { useState } from "react";

const User = (props) => {
  // Behind this 2 or more useState is it in the big single object {just like Class state}
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(2);
  return (
    <div className="user-card">
      <h1>Functional Component</h1>

      <h1>Count = {count}</h1>
      <h1>Count2 = {count2}</h1>
      <h2>Name: {props.name}</h2>
      <h3>Location: {props.location}</h3>
      <h4>Contact: riyazpathan193.rp@gmail.com</h4>
    </div>
  );
};

export default User;
