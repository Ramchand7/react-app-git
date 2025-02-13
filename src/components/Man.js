import React from "react";
 function Man(props) {
    return (
      <div>
        <h1 onClick={props.remove}>Man: {props.name}, age {props.age}</h1>
      </div>
    );
}
export default Man