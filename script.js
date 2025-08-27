let bubbleArray = [];
let mergeArray = [];
const arraySize = 30;

function generateArrays() {
  bubbleArray = [];
  for (let i = 0; i < arraySize; i++) {
    bubbleArray.push(Math.floor(Math.random() * 100) + 1);
  }
  mergeArray = [...bubbleArray]; // clone array for merge sort

  displayArray(bubbleArray, "bubble-array");
  displayArray(mergeArray, "merge-array");
}

function displayArray(arr, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  for (let val of arr) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val * 3}px`;
    container.appendChild(bar);
  }
}

async function bubbleSort() {
  const bars = document.getElementById("bubble-array").children;
  for (let i = 0; i < bubbleArray.length - 1; i++) {
    for (let j = 0; j < bubbleArray.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (bubbleArray[j] > bubbleArray[j + 1]) {
        let temp = bubbleArray[j];
        bubbleArray[j] = bubbleArray[j + 1];
        bubbleArray[j + 1] = temp;
        displayArray(bubbleArray, "bubble-array");
      }

      await new Promise(res => setTimeout(res, 100));
      bars[j].style.backgroundColor = "teal";
      bars[j + 1].style.backgroundColor = "teal";
    }
  }
  for (let bar of bars) {
    bar.style.backgroundColor = "green";
  }
}

async function mergeSort(start = 0, end = mergeArray.length - 1) {
  if (start >= end) return;
  const bars = document.getElementById("merge-array").children;

  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end, bars);
}

async function merge(start, mid, end, bars) {
  let merged = [];
  let left = start;
  let right = mid + 1;

  while (left <= mid && right <= end) {
    bars[left].style.backgroundColor = "red";
    bars[right].style.backgroundColor = "red";
    await new Promise(res => setTimeout(res, 100));

    if (mergeArray[left] < mergeArray[right]) {
      merged.push(mergeArray[left]);
      bars[left].style.backgroundColor = "teal";
      left++;
    } else {
      merged.push(mergeArray[right]);
      bars[right].style.backgroundColor = "teal";
      right++;
    }
  }

  while (left <= mid) {
    merged.push(mergeArray[left]);
    bars[left].style.backgroundColor = "red";
    await new Promise(res => setTimeout(res, 100));
    bars[left].style.backgroundColor = "teal";
    left++;
  }

  while (right <= end) {
    merged.push(mergeArray[right]);
    bars[right].style.backgroundColor = "red";
    await new Promise(res => setTimeout(res, 100));
    bars[right].style.backgroundColor = "teal";
    right++;
  }

  for (let i = 0; i < merged.length; i++) {
    mergeArray[start + i] = merged[i];
    displayArray(mergeArray, "merge-array");
    bars[start + i].style.backgroundColor = "green";
    await new Promise(res => setTimeout(res, 100));
  }
}

function startSorts() {
  bubbleSort();
  mergeSort();
}

// Generate initial arrays on page load
generateArrays();
