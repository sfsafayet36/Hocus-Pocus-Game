let character;
let randNum;
let randNum2;
let gridX;
let gridY
let scorePoint = 0;

let time = 0;

let score = document.getElementById("score")

let gameContainer = document.getElementById("game-container")

let highScoreHtml = document.getElementById('high-score')

let timeHtml = document.getElementById("time");

let playBtn = document.getElementById('playbtn')

let gameMenu = document.getElementById('game-menu')

let gameOverHtml = document.getElementById("game-over")

let gameOverScore = document.getElementById("overscore")

let gameOverAudio = new Audio("./musics/gameover.wav")

let highScore = localStorage.getItem('highScore') || 0;

highScoreHtml.innerHTML = highScore;

let retryBtn = document.getElementById("retry")

function apple() {
   character = document.createElement("img")

   character.src = "./images/1663288.gif"

   character.classList.add("character")

   character.addEventListener('click', function() {
      scorePoint += 10;
      score.innerHTML = scorePoint;

      updateHighScore(scorePoint)
   })


}

function randomSpawn() {
   randNum = Math.floor(Math.random() * 10)

   randNum2 = Math.floor(Math.random() * 10)

   gridX = randNum;

   gridY = randNum2;

   gameContainer.appendChild(character)
   character.style.gridArea = `${gridX}/ ${gridY}`;


}

function updateHighScore(newScore) {
   
   
   if (newScore > highScore) {
      
      localStorage.setItem('highScore', newScore);

      
      highScore = newScore;
      highScoreHtml.innerHTML = scorePoint;

   }

}

function timeUpdate() {

   let timeInt = setInterval(function() {


      time++
      timeHtml.innerHTML = time;


   }, 1000)

   setInterval(function() {
      if (time === 60) {
         time = 0
         timeHtml.innerHTML = time
         clearInterval(timeInt)
         gameOver()

      }
      if (scorePoint === 500) {
         time = time - 20;
      }
   }, 1000)

}

function gameOver() {
   gameOverHtml.style.transform = "scale(1)"
   gameOverScore.innerHTML = scorePoint
   gameOverAudio.play()

}

playBtn.addEventListener('click', function() {
   gameMenu.classList.toggle('out')
   setInterval(randomSpawn, 600)
   timeUpdate()

})

retryBtn.addEventListener("click", function() {
   randomSpawn()
   gameOverHtml.style.transform = 'scale(0)';
   scorePoint = 0;
   score.innerHTML = scorePoint
   timeUpdate()
})


apple()


