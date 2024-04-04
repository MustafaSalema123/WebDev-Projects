// //Quiz App
// const inputBox = document.getElementById("input-box");
// const  listContainer = document.getElementById("list-container");

// function addTask()
// {
//    if(inputBox.value === '')
//    {
//     alert("You Must Write Something!");
//    } else
//    {
//     let li = document.createElement("li")
//     li.innerHTML = inputBox.value;
//     listContainer.appendChild(li);
//     let Span = document.createElement("span");
//     Span.innerHTML = "\u00d7";
//     li.appendChild(Span);
//    }
//    inputBox.value ='';
//    SaveData();
// }

// listContainer.addEventListener("click", function(e)
// {
//     if(e.target.tagName === "LI"){
//         e.target.classList.toggle("checked");

//         SaveData();

//     }else if(e.target.tagName === "SPAN")
//     {
//         e.target.parentElement.remove();
//         SaveData();
//     }
// } , false)


// function SaveData()
// {
//     localStorage.setItem("data" , listContainer.innerHTML);
// }
f
// function showTask()
// {
//     listContainer.innerHTML = localStorage.getItem("data");
// }
// showTask();


//Secodn project
// const questions = [ 
    
//     {
//         question : "Which is largest animal in the world?",
//         answers : 
//         [
//             {text: "Shark" , correct: false},
//             {text: "blue Whale" , correct: true},
//             {text: "elephant" , correct: false},
//             {text: "giraffe" , correct: false},
//         ]
//     },
//     {
//         question : "Which is the smallest continent in the world?",
//         answers : 
//         [
//             {text: "Asia" , correct: false},
//             {text: "Austraila" , correct: true},
//             {text: "artic" , correct: false},
//             {text: "Africa" , correct: false},
//         ]
//     }
// ]

// const questionElemnt = document.getElementById("questions");
// const answersButton = document.getElementById("answer-question");
// const nextButton = document.getElementById("next-btn");

// let currntQuestionIndex = 0;
// let Score = 0;

// function StartQuiz()
// {
//     currntQuestionIndex = 0;
//      Score = 0;
//     nextButton.innerHTML = "Next";
//     showQuestion();

// }

// function showQuestion()
// {
//  let currntQuestion = questions[currntQuestionIndex];
//  let questionNo = currntQuestionIndex +1;
//  questionElemnt.innerHTML = questionNo + ". " + currntQuestionIndex
// }