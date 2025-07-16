import React from "react";
import { useState } from "react";
//the point of this is that it's dummy info just needed so that I can test it
function test(fakeData) {
  const [poll, setPoll] = useState({   
    title: "top 3 video games",
    options: ["black opps 2", "persona5", "eldenring"],
  });

  // show the compoent take the object and take all the
  //proptries and use them as props
  return <MyComponent {...poll}></MyComponent>;
}



