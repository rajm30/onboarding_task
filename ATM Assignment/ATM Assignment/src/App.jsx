import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [noteOftwenty, setnoteOftwenty] = useState(0);
  const [noteOfFifty, setnoteOfFifty] = useState(0);
  const [noteOfHundred, setnoteOfHundred] = useState(0);
  const [multiplicationOfTwenty, setmultiplicationOfTwenty] = useState(0);
  const [multiplicationOfFifty, setmultiplicationOfFifty] = useState(0);
  const [multiplicationOfHundred, setmultiplicationOfHundred] = useState(0);
  const [total, setTotal] = useState(0);

  function checkInput() {
    let value = parseInt(input);
    let countFifty = 0;
    let countTwenty = 0;
    let countHundred = 0;

    if (value === 10 || value === 30 || value % 10 !== 0) {
      setInput("");
      value = value - value;
      alert("Enter valid Number");
    }
    while (value % 100 === 10 || value % 100 === 30) {
      value = value - 20;
      countTwenty = countTwenty + 1;
    }

    if (value % 50 === 10 || value % 50 === 30) {
      countHundred = Math.floor(value / 100);
      value = value % 100;
      countTwenty = countTwenty + Math.floor(value / 20);
    } else {
      countHundred = Math.floor(value / 100);
      value = value % 100;
      countFifty = Math.floor(value / 50);
      value = value % 50;
      countTwenty = countTwenty + Math.floor(value / 20);
    }
    setInput("");
    setnoteOftwenty(countTwenty);
    setnoteOfFifty(countFifty);
    setnoteOfHundred(countHundred);
  }

  useEffect(() => {
    setmultiplicationOfTwenty(20 * noteOftwenty);
    setmultiplicationOfHundred(100 * noteOfHundred);
    setmultiplicationOfFifty(50 * noteOfFifty);
  }, [noteOfHundred, noteOfFifty, noteOftwenty]);

  useEffect(() => {
    setTotal(
      multiplicationOfTwenty + multiplicationOfFifty + multiplicationOfHundred
    );
  }, [multiplicationOfTwenty, multiplicationOfFifty, multiplicationOfHundred]);

  return (
    <div>
      <div className="mt-5 ml-3">
        <input
          className="border border-black pl-1"
          type="text"
          value={input}
          placeholder="Enter Value Here"
          onChange={(e) => setInput(e.target.value)}
        />
        <p className="mt-3">
          Note: Please enter value in multiple of 10 (excluding 10 and 30).
        </p>

        <button
          onClick={checkInput}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Check
        </button>
      </div>
      <div className="ml-3 mt-5">
        <table className="w-full border border-black mr-10 ">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-2 text-left">Note</th>
              <th className="border border-black p-2 text-left">Notes</th>
              <th className="border border-black p-2 text-left">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">
                No. of 20 notes: {noteOftwenty}
              </td>
              <td className="border border-black p-2">20 * {noteOftwenty}</td>
              <td className="border border-black p-2">
                {multiplicationOfTwenty}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">
                No. of 50 notes: {noteOfFifty}
              </td>
              <td className="border border-black p-2">50 * {noteOfFifty}</td>
              <td className="border border-black p-2">
                {multiplicationOfFifty}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">
                No. of 100 notes: {noteOfHundred}
              </td>
              <td className="border border-black p-2">100 * {noteOfHundred}</td>
              <td className="border border-black p-2">
                {multiplicationOfHundred}
              </td>
            </tr>
            <tr className="">
              <td className=" "></td>
              <td className="border-3 border-black p-2">Total Amount:-</td>
              <td className="border-3 border-black p-2">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
