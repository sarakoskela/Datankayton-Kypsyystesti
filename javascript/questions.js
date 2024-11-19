let currentQuestionIndex = 0;
let questionsData = [];

// Fetch JSON data and initialize questions
fetch('../questions.json')
    .then(response => response.json())
    .then(data => {
        questionsData = data.questions;  // Store all questions
        displayQuestion(currentQuestionIndex);  // Display the first question
    })
    .catch(error => console.error("Error loading questions:", error));

// Function to display a single question based on the index
function displayQuestion(index) {
    const container = document.getElementById('question-container');
    container.innerHTML = '';  // Clear any previous question

    const item = questionsData[index];
    if (!item) return;  // Check if the question exists

    const questionWrapper = document.createElement('div');
    questionWrapper.classList.add('mb-4');  // Bootstrap margin for spacing

    // Extract question key and text
    const questionText = item[`Q${index + 1}`];

    // Create question label
    const questionLabel = document.createElement('label');
    questionLabel.classList.add('form-label', 'fw-bold');  // Bootstrap classes for label
    questionLabel.textContent = `${index + 1}. ${questionText}`;
    questionWrapper.appendChild(questionLabel);

    // Create radio buttons for each option
    item.options.forEach((option, optionIndex) => {
        const radioWrapper = document.createElement('div');
        radioWrapper.classList.add('form-check');  // Bootstrap radio wrapper

        const radioInput = document.createElement('input');
        radioInput.classList.add('form-check-input');  // Bootstrap radio input
        radioInput.type = 'radio';
        radioInput.name = `question-${index}`;  // Group by question
        radioInput.id = `question-${index}-option-${optionIndex}`;  // Unique ID for each option
        radioInput.value = option;

        const radioLabel = document.createElement('label');
        radioLabel.classList.add('form-check-label');  // Bootstrap label for radio
        radioLabel.htmlFor = radioInput.id;  // Associate label with input
        radioLabel.textContent = option;

        // Append radio input and label to the radio wrapper
        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(radioLabel);

        // Add the radio wrapper to the question wrapper
        questionWrapper.appendChild(radioWrapper);

        // Enable the Next button when an option is selected
        radioInput.addEventListener('change', () => {
            nextButton.disabled = false;
        });
    });

    // Add the question wrapper to the container
    container.appendChild(questionWrapper);

    // Disable the Next button initially until an option is selected
    nextButton.disabled = true;
}

// Event listener for the Next button
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    // Move to the next question
    currentQuestionIndex++;

    // If there are more questions, display the next question
    if (currentQuestionIndex < questionsData.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        // If there are no more questions, show a completion message
        document.getElementById('question-container').innerHTML = '<p>Thank you for completing the questionnaire!</p>';
        nextButton.style.display = 'none';  // Hide the Next button
    }
});
