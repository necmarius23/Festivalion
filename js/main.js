window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('/serviceWorker.js');
    }
  }

document.getElementsByClassName('hamburger-icon')[0]
    .addEventListener('click', function (event) {
    var element = document.getElementById('navbar-hidden');
    console.log("asdadsads");
    element.classList.toggle("navbar-open");
});
function showModal(name){
    let title;
    let content;
    let imgSrc;
    switch (name){
        case 'gorillaz':
            title = 'About Gorillaz';
            content = 'Gorillaz are a British virtual band created in 1998 by musician Damon Albarn and artist Jamie Hewlett. The band primarily consists of four animated members: 2-D, Murdoc Niccals, Noodle, and Russel Hobbs. Their fictional universe is presented in music videos, interviews and short cartoons. In reality, Albarn is the only permanent musical contributor, and Gorillaz music often features collaborations with a wide range of featured artists. Remi Kabaka Jr. became the producer for the band in 2016 after several years of providing the voice of Russel Hobbs and was listed as an official member alongside Albarn and Hewlett in the 2019 documentary Gorillaz: Reject False Icons';
            imgSrc = '/images/content/bands/gorillaz.jpg';
            break;
        case '21pilots':
            title = 'About Twenty One Pilots';
            content = 'Twenty One Pilots (stylized in all lowercase or as twenty øne piløts) is an American musical duo from Columbus, Ohio. The band was formed in 2009 by lead vocalist Tyler Joseph along with Nick Thomas and Chris Salih, both of whom left in 2011. Since their departure, the line-up has consisted of Joseph and drummer Josh Dun. The duo is best known for the singles "Stressed Out", "Ride", and "Heathens". The group received a Grammy Award for Best Pop Duo/Group Performance at the 59th Annual Grammy Awards for "Stressed Out".';
            imgSrc = '/images/content/bands/21-pilots.jpg';
            break;
        case '5gang':
            title = 'About 5Gang';
            content = '5GANG is a musical group formed by Selly and four other Romanian vloggers that was founded on December 22, 2017. The name was chosen by Vasco Tătaru.';
            imgSrc = '/images/content/bands/5gang.jpg';
            break;
        default:
            title = 'Iuliana Beregoi';
            content = 'Iuliana Beregoi is a cool singer from Romania';
            imgSrc = '/images/content/bands/iulianaberegoi.jpg';
    }
    document.getElementById('modal-title').innerText=title;
    document.getElementById('modal-content').innerText=content;
    document.getElementById('modal-image').src=imgSrc;
    document.getElementById('modal').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal(){
    document.getElementById('modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
}

function playAudio(name){
    let audioFile = '/audio/'+ name +'.mp3';
    let audio = document.getElementsByTagName("audio")[1];
    let audioSource = document.getElementById('audioSource');
    audioSource.src=audioFile;
    audio.load();
    audio.play();
}

function closeAudio(){
    let audio = document.getElementsByTagName("audio")[1];
    audio.pause();
    audio.currentTime=0;
}
function playGame(answerIds){
    console.log(answerIds);
    answerIds.forEach(answerId => {
        let classes = document.getElementById(answerId).classList;
        classes.remove('correct-answer');
        classes.remove('wrong-answer');
    });
    let random = Math.floor(Math.random() * 5) + 1;
    document.getElementById("gameAudioSource").src='/audio/playlist/' + random + '.mp3';
    let audio = document.getElementById("gameAudio");
    switch(random) {
        case 1: 
            answer='5GANG - FORTZINNI';
            break;
        case 2:
            answer='Gorillaz - Clint Eastwood'
            break;
        case 3:
            answer='Gorillaz - Feel Good Inc.'
            break;
        case 4:
            answer='Iuliana Beregoi - Cum suna linistea'
            break;
        case 5:
            answer='twenty one pilots - Chlorine'
            break;
    }
    audio.load();
}
let answer;

function checkAnswer(userAnswer, answerId){
    console.log('here')
    let answerContainer = document.getElementById(answerId);
    if(userAnswer === answer){
        answerContainer.classList.add('correct-answer');
    } else { 
        answerContainer.classList.add('wrong-answer');
    }
}


let context;

let initialX3=650;
let initialY3=250;

let x3=10;
var y3=10;

function bouncing()
{
  context= myCanvas.getContext('2d');
  setInterval(draw,10);
}

function draw()
{
 
	context.clearRect(0,0,650,250);

	context.beginPath();
  context.fillStyle="#2d275a";
  
  context.arc(initialX3,initialY3,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();

if( initialX3<0 || initialX3>650) x3=-x3; 

if( initialY3<0 || initialY3>250) y3=-y3; 
initialX3+=x3; 
initialY3+=y3;
}

window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("speech");
    const result = document.getElementById("result");
    let listening = false;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (typeof SpeechRecognition !== "undefined") {
      const recognition = new SpeechRecognition();

      const stop = () => {
        recognition.stop();
        button.textContent = "Start listening";
      };

      const start = () => {
        recognition.start();
        button.textContent = "Stop listening";
      };

      const onResult = event => {
        result.innerHTML = "";
        for (const res of event.results) {
          const text = document.createTextNode(res[0].transcript);
          const p = document.createElement("p");
          p.appendChild(text);
          result.appendChild(p);
        }
      };
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.addEventListener("result", onResult);
      button.addEventListener("click", event => {
        listening ? stop() : start();
        listening = !listening;
      });
    } else {
      button.remove();
    }
  });