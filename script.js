//setting for animation not to load 
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);
console.log('script is connected with the project');
const btnShowrules =document.querySelector('.rules-btn');
const btnHiderules=document.querySelector('.close-btn')
const nextButton=document.querySelector('.next-btn');
const rules=document.querySelector('.modal')
let userWin;


//array making with object so that we can make game logic
const CHOICES=[
  {
    name:'paper',
    beats:'rock'
  },
  {
     name:'rock',
     beats:'scissors'
  },
  {
    name:'scissors',
    beats:'paper'
  }
]

// storing scores in local storage  
  let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
  let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

  document.getElementById('your-score').textContent = playerScore;
  document.getElementById('ai-score').textContent = computerScore;

//requiring all the divs and buttons for making queries with the help of query selector 
const choiceButtons=document.querySelectorAll('.choice-btn');
const gameDiv=document.querySelector('.game');
const resultsDiv=document.querySelector('.results');
const resultsDivs=document.querySelectorAll('.results-result')
const resultWinner=document.querySelector('.results-winner')
const resultsText=document.querySelector('.results-text')
const playAgainBtn=document.querySelector('.play-again')
const winnerUserpage=document.querySelector('.winner-user-section')
const headerContent=document.querySelector('.header')
const winnerPlayagainBtn=document.querySelector('.play-btn')


//giving choice so that user and computer can choose 
choiceButtons.forEach(button =>{
  button.addEventListener('click',()=>{
    const choiceName=button.dataset.choice;
    const choice=CHOICES.find((choice )=> choice.name === choiceName);
    choose(choice)
  })
 
})
//function so that user can choose 
function choose(choice){
  const aichoice=aiChoose();
  displayResults([choice,aichoice])
  displayWinner([choice,aichoice])

}

//function so that computer can choice randomly 
function aiChoose(){
  const rand=Math.floor(Math.random() * CHOICES.length)
  return (CHOICES[rand])
}

//function to show the choices
function displayResults(results){
   resultsDivs.forEach((resultDiv,index)=>{
     setTimeout(()=>{
        resultDiv.innerHTML = `
        <div class="choice ${results[index].name}">
          <img src="./images/${results[index].name}.png" alt="${results[index].name}" />
        </div> 
        `

        
     },index * 800)
   })
   gameDiv.classList.toggle('hidden');
   resultsDiv.classList.toggle('hidden');
   
}

//display winner -- it's a function to displa winner
function displayWinner(results){
  setTimeout(()=>{
    userWin =isWinner(results)
    const aiWin =isWinner(results.reverse())
    if(userWin){
      resultsText.innerHTML = `<h1 style="font-size: 2rem;margin-left:10px;letter-spacing: 0.15em;" >you win</h1><p  style="font-size: 1rem; margin-left:30px;letter-spacing: 0.1em;">AGAINST PC</p>`;
      resultsDivs[0].classList.toggle('winner')
      playerScore++
      btnShowrules.className='rules-btn-next'
      nextButton.classList.toggle('hidden')
    }
    else if(aiWin){
      resultsText.innerHTML = `<h1 style="font-size: 2rem;letter-spacing: 0.15em;" >you lose</h1><p  style="font-size: 1rem; margin-left:30px;letter-spacing: 0.1em;">AGAINST PC</p>`;
      resultsDivs[1].classList.toggle('winner')
      computerScore++
    }
    else{
      resultsText.innerText = 'Tie Up'
    }
    updateScoreboard()
    resultWinner.classList.toggle('hidden');
  },1700);
 
  
  resultsDiv.classList.toggle('show-winner');
  
}

//function to decide winner 
function   isWinner(results){
  return (results[0].beats === results[1].name)
}


//play button onclick  
playAgainBtn.addEventListener('click',()=>{
  btnShowrules.className='rules-btn'
  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');
  resultsDivs.forEach(resultDiv =>{
    resultDiv.innerHTML="";
    resultDiv.classList.remove('winner')
  })
  resultsText.innerHTML="";
  resultWinner.classList.toggle('hidden')
  resultsDiv.classList.toggle('show-winner');
  if(userWin){
    nextButton.classList.toggle('hidden')
  }
  
})

//next button onclicked
nextButton.addEventListener('click',()=>{
  btnShowrules.className='rules-btn'
  console.log('next button clicked');
  nextButton.classList.toggle('hidden')
  headerContent.classList.toggle('hidden')
  resultsDiv.classList.toggle('hidden')
  winnerUserpage.classList.toggle('hidden')

})

//winner page play again button logic

winnerPlayagainBtn.addEventListener('click',()=>{
  console.log('play again btn tapp');
  winnerUserpage.classList.toggle('hidden')
  gameDiv.classList.toggle('hidden');
  headerContent.classList.toggle('hidden')
  resultsDivs.forEach(resultDiv =>{
    resultDiv.innerHTML="";
    resultDiv.classList.remove('winner')
  })
  resultsText.innerHTML="";
  resultWinner.classList.toggle('hidden')
  resultsDiv.classList.toggle('show-winner');
})

//here is a function to update scoreboard 
function updateScoreboard() {
  localStorage.setItem('playerScore', playerScore);
  localStorage.setItem('computerScore', computerScore);

  document.getElementById('your-score').textContent = playerScore;
  document.getElementById('ai-score').textContent = computerScore;
}

//button to show the rules and hide the rules 
btnShowrules.addEventListener('click',()=>{
  console.log('rules button clicked');
  rules.classList.toggle('show-modal')
})
btnHiderules.addEventListener('click',()=>{
  rules.classList.toggle('show-modal')
  console.log('hide button clicked');
})