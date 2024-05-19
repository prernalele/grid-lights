import { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  /*
  1. Render a 3 * 3 grid
  2. have an on click method that sets the state for greenArray
  3. Structure of greenArray is an array []
  4. when one clicks on the grid item, based on the index, that number is pushed into 
  greenArray and specific color is added
  5. when the length of greenArray == 8 then start emptying the array
  6. setInterval to pop the array in reverse order
  */
  // [true, true, true]
  // [3,5,7]
  const [greenArray, setGreenArray] = useState(Array(9).fill(false));
  const [orderedGreen, setOrderedGreen] = useState([]);

  //const [orderedGreen, setOrderedGreen] = useState([undefined, undefined, undefined, undefined, '4', undefined, undefined, undefined, undefined])
  const [startEmptying, setStartEmptying] = useState(false);

  const makeItGreen = (event, index) => {
    setOrderedGreen((prev) => {
      console.log("previous ordered G. inside make it green", prev);
      const isThereAlready = prev.find(
        (elem) => elem === event.target.id || event.target.id === "4"
      );
      return isThereAlready ? [...prev] : [...prev, event.target.id];
    });
    setGreenArray((previousValues) => {
      if (event.target.id === 4) {
        return [...previousValues];
      } else {
        previousValues.splice(event.target.id, 1, true);
        return [...previousValues];
      }
    });
  };

  useEffect(() => {
    // add a plainWhite class
    // pop the id

    const emptyGreens = () => {
      const numPopped = orderedGreen.pop();
      console.log("numPopped", numPopped);
      // setGreenArray((prev) =>  prev.find((value, index) => index === numPopped) = false)
      console.log("green array", greenArray[numPopped]);
      setGreenArray((prev) => {
        console.log("value that was found in previous", prev[numPopped]);
        //prev.splice(prev[numPopped], 1, false);
        if (numPopped !== 4) {
          prev[numPopped] = false;
        }
        if (numPopped === 4) {
          prev[numPopped] = true;
        }
        console.log("splice ", [...prev]);
        return [...prev];
      });

      if (orderedGreen.length === 0) {
        setStartEmptying(false);
      }
    };
    console.log("ordered green length", orderedGreen.length);
    orderedGreen.length === 8 && setStartEmptying(true);

    if (startEmptying) {
      //console.log("inside set Interval if block")
      const id = setInterval(emptyGreens, 1000);
      return () => clearInterval(id);
    }
  }, [orderedGreen, startEmptying, greenArray]);

  // useEffect(() => {
  //   console.log("greenArray", greenArray)
  //   console.log("orderedGreen", orderedGreen)
  //   console.log("startEmptying", startEmptying)
  // }, [greenArray, orderedGreen])

  const Cell = ({ index }) => {
    //console.log("orderedGreen", orderedGreen);
    return (
      <div
        key={index}
        id={index}
        className={[
          "plainWhite",
          greenArray[index] ? "greenFill" : "",
          index === 4 && "plainWhiteNoBorders",
        ].join(" ")}
        onClick={(event, index) => makeItGreen(event, index)}
      >
        {`Square ${index}`}
      </div>
    );
  };

  // (greenArray.filter((elem) => elem === false)).length ===1 && orderedGreen.length-1}

  return (
    <div className="container">
      {greenArray.map((square, index) => {
        return <Cell key={index} index={index} />;
      })}
    </div>
  );
}
