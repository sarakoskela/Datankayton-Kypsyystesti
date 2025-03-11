//import { displayAnalysis } from "./Express.js";

let currentQuestionIndex = 0;
let currentTitleIndex = 0;
let questionsData = [];
let titlesData = [];
let rankingPointCounter = 0;

let answersData = {
    answers: [
        { Q1: "Onko yrityksellänne selkeä visio, missio ja arvot, jotka tukevat osallistumista tietoekosysteemiin?", A1: "" },
        { Q2: "Onko yrityksellänne selkeät käytännöt datan keräämiseen, elinkaaren hallintaan ja laadunvarmistukseen osana ekosysteemin toimintaa?", A2: "" },
        { Q3: "Onko yrityksellänne käytössä mekanismit (esim. anonymisointi, pseudonymisointi) henkilötietojen suojan varmistamiseksi datan jakamisessa?", A3: "" },
        { Q4: "Onko yrityksellänne tekniset valmiudet varmistaa datan yhteen toimivuus ekosysteemissä (esim. semanttinen ja tekninen yhteensopivuus)?", A4: "" },
        { Q5: "Onko yrityksellänne selkeät datan käyttöoikeuksia ja jakamista koskevat periaatteet, jotka ovat linjassa Sitran Reilun datatalouden sääntökirjan kanssa?", A5: "" },
        { Q6: "Onko yrityksellänne tarvittavat tekniset valmiudet, kuten API-rajapinnat ja identiteetinhallinta, mahdollistamaan datan turvallisen jakamisen?", A6: "" },
        { Q7: "Onko yrityksessänne tunnistettu ja hallittu tietoturvariskejä, jotka liittyvät datan jakamiseen ekosysteemissä?", A7: "" },
        { Q8: "Onko yrityksenne tietoinen ja valmis noudattamaan datan jakamiseen liittyviä lakeja ja säädöksiä, kuten GDPR:ää ja kansallista tietosuojalainsäädäntöä?", A8: "" },
        { Q9: "Onko yrityksenne määritellyt selkeästi oman roolinsa (esim. datan tarjoaja, palveluntarjoaja, loppukäyttäjä) ekosysteemissä?", A9: "" },
        { Q10: "Kuinka hyvin yrityksenne noudattaa eettisiä periaatteita, kuten datan reilu käyttö, yksityisyyden suoja ja vastuullisuus?", A10: "" },
        { Q11: "Kuinka hyvin yrityksenne on tunnistanut ja määritellyt liiketoimintahyödyt, jotka tietoekosysteemiin liittymisestä syntyvät?", A11: "" },
        { Q12: "Onko yrityksellänne valmiudet tehdä yhteistyötä muiden ekosysteemin toimijoiden kanssa ja osallistua ekosysteemin hallinnointiin?", A12: "" },
        { Q13: "Kuinka hyvin yrityksenne tuntee tietoekosysteemin sopimusmallit ja hallinnolliset käytännöt?", A13: "" }
    ]
};


// Fetch JSON data and initialize questions
fetch('../questions.json')
    .then(response => response.json())
    .then(data => {
        questionsData = data.questions;
        displayQuestion(currentQuestionIndex);
    })
    .catch(error => console.error("Error loading questions:", error));

fetch('../titles.json')
    .then(response => response.json())
    .then(data => {
        titlesData = data.titles;
        displayQuestion(currentQuestionIndex);
    })
    .catch(error => console.error("Error loading titles:", error));


// Function to display a single question based on the index
function displayQuestion(index) {
    const container = document.getElementById('question-container');
    container.innerHTML = '';
    const item = questionsData[index];
    if (!item) return;

    const questionWrapper = document.createElement('div');
    questionWrapper.classList.add('mb-4');

    const titleRanges = [
        { titleIndex: 0, questionIndexes: [0] },
        { titleIndex: 1, questionIndexes: [1, 2, 3, 4] },
        { titleIndex: 2, questionIndexes: [5] },
        { titleIndex: 3, questionIndexes: [6] },
        { titleIndex: 4, questionIndexes: [7] },
        { titleIndex: 5, questionIndexes: [8] },
        { titleIndex: 6, questionIndexes: [9] },
        { titleIndex: 7, questionIndexes: [10] },
        { titleIndex: 8, questionIndexes: [11, 12] }
    ];

    const titleToDisplay = titleRanges.find(range => range.questionIndexes.includes(index));
    if (titleToDisplay) {
        const titleData = titlesData[titleToDisplay.titleIndex];
        if (titleData) {
            const titleWrapper = document.createElement('h5');
            titleWrapper.classList.add('fw-bold', 'my-3');
            titleWrapper.textContent = Object.values(titleData)[0];
            container.appendChild(titleWrapper);
        }
    }
    const questionText = item[`Q${index + 1}`];

    // Create question label
    const questionLabel = document.createElement('label');
    questionLabel.classList.add('form-label', 'fw-bold');
    questionLabel.textContent = `${index + 1}. ${questionText}`;
    questionWrapper.appendChild(questionLabel);

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider-wrapper', 'my-3');

    const sliderInput = document.createElement('input');
    sliderInput.type = 'range';
    sliderInput.classList.add('form-range');
    sliderInput.min = item.min || 0;
    sliderInput.max = item.max || 10;
    sliderInput.step = item.step || 1;
    sliderInput.id = `question-${index}-slider`;
    sliderInput.value = sliderInput.min;

    const sliderValue = document.createElement('span');
    sliderValue.classList.add('slider-value', 'ms-2');
    sliderValue.textContent = sliderInput.min;

    sliderInput.addEventListener('input', () => {
        sliderValue.textContent = sliderInput.value;
        nextButton.disabled = sliderInput.value === "0";
    });

    sliderWrapper.appendChild(sliderInput);
    sliderWrapper.appendChild(sliderValue);
    questionWrapper.appendChild(sliderWrapper);

    container.appendChild(questionWrapper);


    container.appendChild(questionWrapper);

    nextButton.disabled = item.type === 'slider';
}



// Event listener for the Next button
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    const questionKey = `A${currentQuestionIndex + 1}`;

    if (currentQuestion.type === 'slider') {
        const sliderValue = document.getElementById(`question-${currentQuestionIndex}-slider`).value;
        answersData.answers[currentQuestionIndex][questionKey] = sliderValue;

        const points = parseInt(sliderValue);
        rankingPointCounter += points;
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        console.log(answersData);

        const scaleReference = document.getElementById('scale-reference');
        if (scaleReference) scaleReference.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';

        document.getElementById('question-container').innerHTML = "Kiitos osallistumisesta!";


        showFeedback();
        //displayAnalysis();
    }

    updateProgress();
});



function updateProgress() {
    let progress = (currentQuestionIndex / questionsData.length) * 100;
    console.log(progress);
    document.getElementById('progress-bar').style.width = progress + "%";
    return progress;
}

function showFeedback() {
    let feedbackMessage = '';
    if (rankingPointCounter > 35) {
        feedbackMessage = "Yrityksesi datankäyttö on erinomaista!";
    } else if (34 >= rankingPointCounter > 25) {
        feedbackMessage = "Yrityksesi datankäyttö on hyvää.";
    } else if (24 >= rankingPointCounter > 15) {
        feedbackMessage = "Yrityksesi datankäytössä on jonkin verran parannettavaa.";
    } else {
        feedbackMessage = "Yrityksesi datankäytössä on paljon parannettavaa.";
    }

    // Display feedback message
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback');
    feedbackContainer.innerHTML = `
        <h2>Pisteesi: ${rankingPointCounter}</h2>
        <p><strong>${feedbackMessage}</strong></p>
    `;

    const container = document.getElementById('question-container');
    container.appendChild(feedbackContainer);

    // Display all questions and answers
    const answersList = document.createElement('div');
    answersList.classList.add('answers-list');
    answersData.answers.forEach((answer, index) => {
        const questionItem = document.createElement('div');
        questionItem.classList.add('answer-item');
        const questionText = questionsData[index][`Q${index + 1}`];
        questionItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${questionText}</p>
            <p><strong>Answer:</strong> ${answer[`A${index + 1}`]}</p>
        `;
        answersList.appendChild(questionItem);
    });

    container.appendChild(answersList);
}