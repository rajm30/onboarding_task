import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [show, setShow] = useState(false);
  const [matchedNumbers, setMatchedNumbers] = useState(new Set());
  const [allIncluded, setAllIncluded] = useState(false);
  const intervalRef = useRef(null);

  function createMatrix(rows, cols) {
    const Matrix = [];
    let usedNumbers = new Set();
    for (let i = 0; i < rows; i++) {
      let row = [];
      while (row.length < cols) {
        const randomNumber = Math.floor(Math.random() * 99);
        if (!usedNumbers.has(randomNumber)) {
          row.push(randomNumber);
          usedNumbers.add(randomNumber);
        }
      }
      Matrix.push(row);
    }
    return Matrix;
  }

  function matchNumber(randomNumber) {
    const allNumbers = matrix.flat();

    if (allNumbers.includes(randomNumber)) {
      setMatchedNumbers((prev) => {
        const updated = new Set(prev).add(randomNumber);

        const isAllMatched = allNumbers.every((num) => updated.has(num));
        if (isAllMatched) {
          setAllIncluded(true);
          setShow(false);
          setCurrentNumber(0);
          clearInterval(intervalRef.current);
        }

        return updated;
      });
    }
  }

  function clickOnStart() {
    setShow(true);
    intervalRef.current = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 99);
      setCurrentNumber(randomNumber);
      matchNumber(randomNumber);
    }, 100);
  }

  function clickOnRefresh() {
    setShow(false);
    clearInterval(intervalRef.current);
    setCurrentNumber(0);
    setMatrix(createMatrix(5, 5));
    setMatchedNumbers(new Set());
    setAllIncluded(false);
  }

  useEffect(() => {
    setMatrix(createMatrix(5, 5));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="shadow-2xl w-[800px] flex flex-col items-center justify-center">
        <div className="text-5xl mt-5">Bingo Board</div>

        {show && <div className="mt-7 text-2xl">{currentNumber}</div>}

        {allIncluded && (
          <div className="mt-4 text-3xl font-bold text-red-500">
            Game is over
          </div>
        )}

        <div className="grid grid-cols-5 gap-6 w-[700px] mt-5 items-center bg-[#f2f2f2] p-6">
          {matrix.flat().map((number, index) => (
            <div
              key={index}
              className={`p-4 h-[40px] w-[40px] flex items-center justify-center rounded font-bold text-lg ${
                matchedNumbers.has(number) ? "bg-green-400 text-white" : ""
              }`}
            >
              {number}
            </div>
          ))}
        </div>

        <div className="mt-2">
          <button
            className="border-2 border-black bg-[#653bb7] w-20 text-white p-3 mt-2 hover:bg-amber-300 rounded-2xl hover:text-black"
            onClick={clickOnStart}
          >
            Start
          </button>
          <button
            className="border-2 border-black bg-[#653bb7] text-white p-3 mt-2 hover:bg-amber-300 m-2 rounded-2xl hover:text-black"
            onClick={clickOnRefresh}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
