const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');                  //Ответы

const optionElements = document.querySelectorAll('.option');


const question = document.getElementById('question'); //вопрос


const numberOfQuestion = document.getElementById('number-of-question'), //номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количесво всех вопросов

let indexOfQuestion,// Индекс текущего вопроса
    indexOfPage = 0; //Индекс страницы

const answersTracker = document.getElementById('answers-tracker');//обертка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка далее
let score = 0; //Итоговый результат

const correctAnswer = document.getElementById('correct-answer'), //Кол-во правелиных ответов
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'), //Кол-во правелиных ответов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); //НАЧАТЬ ЗАНОВО


const questions = [
    {
        question: 'Как в JS вычислить процент от числа ?',
        options: [
            'Так в JS нельзя сделать',
            'Оператор : %',
            'Вызвать метод findPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения: "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error',
        ],
        rightAnswer: 1
    },
    {
        question: 'На JS писать нельзя',
        options: [
            'Игры',
            '1Скрипты для сайтов',
            'Десктопные приложения',
            'Плохо',
        ],
        rightAnswer: 3
    }
]


numberOfAllQuestions.innerHTML = questions.length; //Выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;//Добавляем Вопрос
    //Мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // Установка номера текущей страници
    indexOfPage++; //Увеличени индекса страницы
};

let completedAnswers = [] // Пустой массив

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length); 
    let hitDuplicate = false; //Якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e))
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled')
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}


//Удаление всех классов и ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled','correct','wrong')
    })
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбратьодин из вариантов ответа')
    } else {
        randomQuestion();
        enableOptions();
    }
}


const quizOver = () => {
    console.log('Конец');
}



btnNext.addEventListener('click', () => {
    validate();
})


window.addEventListener('load', () => {
    randomQuestion();
});


