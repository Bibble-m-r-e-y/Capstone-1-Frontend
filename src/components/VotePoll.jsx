import React from "react";
import { useState } from "react";
//the point of this is that it's dummy info just needed so that I can test it

function test() {
  const [poll, setPoll] = useState({   
    title: "top 3 video games",
     options:["black opps 2", "persona5", "eldenring", ]
  });

// const handleSubmit = (event) =>{
//   setPoll(event.target.value);
// }

// poll.options.map


  // show the compoent take the object and take all the
  //proptries and use them as props
//   return 
//   // <button className= onClick={setPoll}>
//     Click Here
//  </button>
// }

const [showVote, showSetVote]= useState(0);

// function option(){

//   const show = poll.map(poll =>
// <li>
// key={poll.options}
// {poll.options}

// </li>
//   );

return (
  <ul>hello</ul>
  );
}
export default test
