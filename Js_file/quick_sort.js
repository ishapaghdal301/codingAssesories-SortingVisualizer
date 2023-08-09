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

function play(){
    document.getElementById('shuffle_btn').className = "btn btn-secondary disabled";
    document.getElementById('play_btn').className = "btn btn-secondary disabled";
    const copy = [...arr];
    qSort(copy,0,n-1);
    animate(moves);
}

function animate(moves){
    if(moves.length == 0){
        showbars();
        document.getElementById('shuffle_btn').className = "btn btn-secondary";
    document.getElementById('play_btn').className = "btn btn-secondary";
        return;
    }
    const move=moves.shift();
    const [i,j] = move.index;

    [arr[i],arr[j]] = [arr[j],arr[i]];

    playnote(200+arr[i]*500);
    playnote(200+arr[j]*500);
    showbars(move);
    setTimeout(function(){
        animate(moves);
    },100);
}

function partition(arr, low, high)
    {
        let temp;
        let pivot = arr[high];
   
        let i = (low - 1);
        for (let j = low; j <= high - 1; j++) {

            if (arr[j] <= pivot) {
                i++;
                
                moves.push({index:[i,j]});
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
   
        temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        moves.push({index:[i+1,high]});
   
        return i + 1;
    }

    function qSort(arr, low, high)
    {
        if (low < high) {
            let pi = partition(arr, low, high);
   
            qSort(arr, low, pi - 1);
            qSort(arr, pi + 1, high);
        }
    }
   


function showbars(move){
    container.innerHTML ="";
    for(let i=0;i<n;i++){
        const bar = document.createElement("div");
        bar.style.width = 100/n+"%"
        bar.style.height = arr[i]*100+"%";
        bar.classList.add("bar");

        if(move && move.index.includes(i)){
                if(i == move.index[0]){
                    bar.style.background="#e7f667";
                }
                if(i == move.index[1]){
                    bar.style.background = "#e0612a";
                }
            
            // bar.style.backgroundColor=
            //     move.type =="swap" ? "red":"#e7f667";
        }
        container.appendChild(bar);
    }
}
