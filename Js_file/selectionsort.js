let slider = document.getElementById("slider");
let no_of_ele = document.getElementById("no_of_ele");
let n = slider.value;
let shuffle_btn = document.getElementById("shuffle_btn");
let play_btn = document.getElementById("play_btn");

// let n = 100;
const arr = [];

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
    const moves =selectionsort(copy);
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

    if(move.type=="swap"){
        showbars(move);
    [arr[i],arr[j]] = [arr[j],arr[i]];
    playnote(200+arr[i]*500);
    playnote(200+arr[j]*500);
    
}
else{
    showbars(move);
}
// showbars(move);
    setTimeout(function(){
        animate(moves);
    },100);
   
}

function selectionsort(arr){
    const moves = [];
    for(let i = 0;i<n-1;i++){
        min = i;
        for(let j=i+1;j<n;j++){
            // moves.push({index:[i,min],type:"comp"});
            if(arr[min] > arr[j]){
                min = j;
            }
        }
        if(min != i){
            moves.push({index:[i,min],type:"swap"});
            [arr[i],arr[min]] = [arr[min],arr[i]];
        }
    }
    return moves;
}

function showbars(move){
    container.innerHTML ="";
    for(let i=0;i<n;i++){
        const bar = document.createElement("div");
        bar.style.height = arr[i]*100+"%";
        bar.style.width = 100/n+"%"
        bar.classList.add("bar");

        if(move && move.index.includes(i)){
            // if(move.type == "comp"){
            //     if(i == move.index[0]){
            //         bar.style.backgroundColor="black";
            //     }
            // }
            if(move.type == "swap"){
                if(i == move.index[1]){
                    bar.style.background="#e0612a";
                }
            }
            
            // bar.style.backgroundColor=
            //     move.type =="swap" ? "red":"blue";
        }
        container.appendChild(bar);
    }
}