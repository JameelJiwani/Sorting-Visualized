let values = [];
var shuffleButton;
var bubbleSortButton;
var quickSortButton;
var mergeSortButton;

function setup() {
  // Create a canvas to display UI
  const canvas = createCanvas(600, 345);

  // Randomize elements
  shufflearray();

  // UI elements
  shuffleButton = createButton('Shuffle');
  shuffleButton.position(20, 325);
  shuffleButton.mousePressed(shufflearray);

  bubbleSortButton = createButton('Bubble Sort');
  bubbleSortButton.position(120, 325);
  bubbleSortButton.mousePressed(bubblesort);

  quickSortButton = createButton('Quick Sort');
  quickSortButton.position(220, 325);
  quickSortButton.mousePressed(callQuickSort);

  mergeSortButton = createButton('Merge Sort');
  mergeSortButton.position(320, 325);
  mergeSortButton.mousePressed(callMergeSort);
}

function draw() {
  // Background black
  background(0);

  // Draw bars to visual represent array elements
  for (let i = 0; i < 60; i++) {
    rect(i * 10, 300 - values[i], 10, 10 + values[i]);
  }
}

function callQuickSort() {
  // Since mousePressed takes no paramters, this function acts as an intermediary function
  quicksort(values, 0, values.length-1);
}

function callMergeSort() {
  // Array based implentation of mergesort
  mergesort(values, 0, values.length - 1);

}

async function mergesort(arr, left, right) {
  if (left < right) {

    let middle = floor((left + right) / 2);

    await mergesort(arr, left, middle);
    await mergesort(arr, middle + 1, right);

    await merge(arr, left, middle, right);
  }
}

async function merge(arr, left, middle, right) {

  // // Create temp arrays
  let L = subset(arr, left, middle - left + 1);
  let R = subset(arr, middle + 1, right - middle);

  let i =0;
  let j = 0;
  let k = left;

  // Merge the temp arrays
  while(i < L.length && j < R.length) {
    if(L[i] <= R[j]) {
      await sleep(10);
      arr[k] = L[i];
      i++
    } else {
      await sleep(10);
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements of L[] if any
  while (i < L.length) {
    await sleep(10);
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy remaining elements of R[] if any
  while (j < R.length) {
    await sleep(10);
    arr[k] = R[j];
    j++;
    k++;
  }

}

async function quicksort(arr, start, end) {
  if(start < end) {
    let index = await partition(arr, start, end);
    await quicksort(arr, start, index-1);
    await quicksort(arr, index+1, end);
  }

}

async function partition(arr, start, end) {
  let index = start;
  let pivot = arr[end];
  for(let i = start; i < end; i++) {
    if(arr[i] < pivot) {
      await sleep(10);
      await swap(arr, i, index);
      index++;
    }
  }
  await swap(arr, index, end);
  return index;
}



async function bubblesort() {
  let swapped = false;
  do {
    swapped = false;
      for (let i = 1; i < values.length; i++) {

        if (values[i] < values[i - 1]) {
          await sleep(10);
          await swap(values, i, i-1);
          swapped = true;
        }
      }
  } while (swapped == true);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shufflearray() {
  for (let i = 0; i < 60; i++) {
    values[i] = random(0, 100);
  }
}

async function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
