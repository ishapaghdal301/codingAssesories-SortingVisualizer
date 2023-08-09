let slider = document.getElementById("slider");
let no_of_ele = document.getElementById("no_of_ele");
let n = slider.value;
let shuffle_btn = document.getElementById("shuffle_btn");
let play_btn = document.getElementById("play_btn");

// let n = 100;
const arr = [];
let moves = [];

init();

let audio = null;

function playnote(freq){
    if(audio == null){
        audio = new(
        AudioContext ||
        webkitAudioContext ||
        window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audio.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audio.currentTime+dur);
    const node = audio.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0,audio.currentTime+dur
    );
    osc.connect(node);
    node.connect(audio.destination)
}

function init(){
    n = slider.value;
    no_of_ele.innerHTML="";
    no_of_ele.innerHTML +=n;
    container.innerHTML="";
    for(let i=0;i<n;i++){
        arr[i] = Math.random();
    }
    showbars();
}

function animate(moves) {
    if (moves.length == 0) {
        showbars();
        document.getElementById('shuffle_btn').className = "btn btn-secondary";
        document.getElementById('play_btn').className = "btn btn-secondary";
        return;
    }
    const move = moves.shift();
    const [k, i, type] = move.index; // Extract indices and type
    
        playnote(200 + arr[k] * 500);
        playnote(200 + arr[i] * 500);
    
    showbars(move);

    // Highlight before merging starts
    setTimeout(function () {
        animate(moves);
    }, 100);
}

function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        merge(arr, left, mid, right);
    }
}

function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;

        moves.push({ index: [k - 1, i + left, left, right], type: "merge" }); // Highlight the current elements being placed
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;

        moves.push({ index: [k - 1, k - 1] });
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;

        moves.push({ index: [k - 1, k - 1] });
    }
}


function play() {
    document.getElementById('shuffle_btn').className = "btn btn-secondary disabled";
    document.getElementById('play_btn').className = "btn btn-secondary disabled";
    const copy = [...arr];
    moves = [];
    mergeSort(copy, 0, n - 1);
    animate(moves);
}

function showbars(move) {
    container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const bar = document.createElement("div");
        bar.style.width = 100 / n + "%";
        bar.style.height = arr[i] * 100 + "%";
        bar.classList.add("bar");

        if (move && move.index.includes(i)) {
            if (i >= move.index[2] && i <= move.index[3]) {
                bar.style.background = "#e7f667"; // Highlight the range being merged
            }
        }
        container.appendChild(bar);
    }
}

