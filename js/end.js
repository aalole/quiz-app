const userName = document.getElementById("username");
const highScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores);
const maxNumOfHighCcores = 5


finalScore.innerText = mostRecentScore;
userName.addEventListener("keyup", ()=>{
    highScoreBtn.disabled = !userName.value
    // if(!userName.value){
    //     highScoreBtn.disabled
    // }
    // return true
});
const saveHighScore = e => {
    e.preventDefault();
    const score = {
        name : userName.value,
        score: Math.floor(Math.random() * 100)
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(maxNumOfHighCcores);

    localStorage.setItem("highScores", JSON.stringify(highScores));
     window.location.href = ("index.html");
}