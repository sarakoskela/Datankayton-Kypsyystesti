let currentQuestionIndex = 0;
let questionsData = [];

let answersData = {
    answers: [
        { Q1: "Söitkö aamupalaa?", A1: "" },
        { Q2: "Mikä tai mitkä ovat lempivärejäsi?", A2: "" },
        { Q3: "Kuinka paljon pidät kahvista asteikolla 1–10?", A3: "" },
        { Q4: "Kumpi tuli ensin muna vai kana?", A4: "" },
        { Q5: "Oletko aamuihminen?", A5: "" },
        { Q6: "Pidätkö talvesta?", A6: "" }
    ]
};

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
    container.innerHTML = ''; // Clear any previous question

    const item = questionsData[index];
    if (!item) return; // Check if the question exists

    const questionWrapper = document.createElement('div');
    questionWrapper.classList.add('mb-4'); // Bootstrap margin for spacing

    // Extract question key and text
    const questionText = item[`Q${index + 1}`];

    // Create question label
    const questionLabel = document.createElement('label');
    questionLabel.classList.add('form-label', 'fw-bold'); // Bootstrap classes for label
    questionLabel.textContent = `${index + 1}. ${questionText}`;
    questionWrapper.appendChild(questionLabel);

    if (item.type === 'radio' || item.type === 'multiselect') {
        // Create input options based on type
        item.options.forEach((option, optionIndex) => {
            const optionWrapper = document.createElement('div');
            optionWrapper.classList.add('form-check'); // Bootstrap wrapper

            const inputElement = document.createElement('input');
            inputElement.classList.add('form-check-input'); // Bootstrap input
            inputElement.type = item.type === 'multiselect' ? 'checkbox' : 'radio'; // Use checkbox for multiselect
            inputElement.name = `question-${index}`; // Group inputs by question
            inputElement.id = `question-${index}-option-${optionIndex}`; // Unique ID
            inputElement.value = option;

            const inputLabel = document.createElement('label');
            inputLabel.classList.add('form-check-label'); // Bootstrap label
            inputLabel.htmlFor = inputElement.id; // Associate label with input
            inputLabel.textContent = option;

            optionWrapper.appendChild(inputElement);
            optionWrapper.appendChild(inputLabel);
            questionWrapper.appendChild(optionWrapper);

            if (item.type === 'radio') {
                inputElement.addEventListener('change', () => {
                    nextButton.disabled = false;
                });
            }
        });

        if (item.type === 'multiselect') {
            const checkboxes = questionWrapper.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    nextButton.disabled = !Array.from(checkboxes).some(cb => cb.checked);
                });
            });
        }
    } else if (item.type === 'slider') {
        // Create slider input
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('slider-wrapper', 'my-3'); // Styling classes

        const sliderInput = document.createElement('input');
        sliderInput.type = 'range';
        sliderInput.classList.add('form-range'); // Bootstrap slider class
        sliderInput.min = item.min || 0;
        sliderInput.max = item.max || 10;
        sliderInput.step = item.step || 1;
        sliderInput.id = `question-${index}-slider`;

        const sliderValue = document.createElement('span');
        sliderValue.classList.add('slider-value', 'ms-2'); // Space for styling
        sliderValue.textContent = sliderInput.min; // Default value

        // Update displayed value when slider changes
        sliderInput.addEventListener('input', () => {
            sliderValue.textContent = sliderInput.value;
            nextButton.disabled = false; // Enable the Next button
        });

        sliderWrapper.appendChild(sliderInput);
        sliderWrapper.appendChild(sliderValue);
        questionWrapper.appendChild(sliderWrapper);
    }

    container.appendChild(questionWrapper);

    // Disable the Next button initially for radios and sliders
    nextButton.disabled = item.type === 'radio' || item.type === 'slider';
}



// Event listener for the Next button
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    const questionKey = `A${currentQuestionIndex + 1}`; // A1, A2, etc.

    // Save the answer based on question type
    if (currentQuestion.type === 'radio') {
        // Find selected radio button
        const selectedOption = document.querySelector(
            `input[name="question-${currentQuestionIndex}"]:checked`
        );
        if (selectedOption) {
            answersData.answers[currentQuestionIndex][questionKey] = selectedOption.value;
        }
    } else if (currentQuestion.type === 'multiselect') {
        // Collect all checked checkboxes
        const selectedOptions = Array.from(
            document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]:checked`)
        ).map(checkbox => checkbox.value);
        answersData.answers[currentQuestionIndex][questionKey] = selectedOptions.join(', ');
    } else if (currentQuestion.type === 'slider') {
        // Get the slider value
        const sliderValue = document.getElementById(`question-${currentQuestionIndex}-slider`).value;
        answersData.answers[currentQuestionIndex][questionKey] = sliderValue;
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        // If no more questions, display answers or save them
        document.getElementById('question-container').innerHTML = '<p>Thank you for completing the questionnaire!</p>';
        nextButton.style.display = 'none'; // Hide the Next button

        // Log answersData or save it to a server
        console.log('User Answers:', JSON.stringify(answersData, null, 2));
    }
});
