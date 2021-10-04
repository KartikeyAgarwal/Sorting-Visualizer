import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort.js';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 190;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

//This is title for the disabled buttons when sorting gets started
const DISABLED_BUTTON = "Currently Disabled"

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 680));
    }
    this.setState({array});
  }

//   disableSortButtons() {
//       document.getElementsById("mergeSort").disabled = true;
//       let buttonStyle = document.getElementById("mergeSort").style;
//       document.getElementsById("mergeSort").title = DISABLED_BUTTON;
//       buttonStyle.background = "#000000";
//   }

quickSort() {
    // this.disableSortButtons();
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true) {
            const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
            const [comparision, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i * ANIMATION_SPEED_MS);
        }
        else {
            const [swap, barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
                continue;
            }
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            },i * ANIMATION_SPEED_MS);  
        }        }
    // this.setState({array: sortArray})
    // const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
    // setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
}

mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        } else {
        setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        }
    }
}

bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for(let i=0; i<animations.length; i++)
    {
        const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true)
        {
            const color = (animations[i][0]==="comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
            const [comparision, barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;    
                barTwoStyle.backgroundColor = color;
            }, i*ANIMATION_SPEED_MS);
        }
        else
        {
            const [swap, barIndex, newHeight] = animations[i];
            if(barIndex === -1) continue;
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }
}

insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    for( let i=0; i<animations.length; i++)
    {
        const isColorChange = (animations[i][0]==="comparision1") || (animations[i][0]==="comparision2");
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true)
        {
            const color = (animations[i][0] ==="comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
            const [temp,barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS); 
        }
        else {
            const [temp, barIndex, newHeight] = animations[i];
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            },i * 2);
        }
    }
}

  // NOTE: This method will only work if sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
}

render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        <div>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              color : "#ffffff",
            }}>{idx}</div>
        ))}
        </div>
        <br></br>
        <button class="btns" id="Generate-new-array" onClick={() => this.resetArray()}>Generate New Array</button>
        <button class="btns" onClick={() => this.quickSort()}>Quick Sort</button>
        <button class="btns" id="mergeSort"onClick={() => this.mergeSort()}>Merge Sort</button>
        <button class="btns" id="insertionSort"onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button class="btns" id="bubbleSort"onClick={() => this.bubbleSort()}>Bubble Sort</button>
        {/* <button onClick={() => this.testSortingAlgorithms()}> */}
          {/* Test Sorting Algorithms (BROKEN) */}
        {/* </button> */}
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}