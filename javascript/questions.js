// Fetch JSON data and display questions
fetch('../questions.json')
    .then(response => response.json())
    .then(data => displayQuestions(data.questions))  // Access the questions array
    .catch(error => console.error("Error loading questions:", error));

// Function to display questions
function displayQuestions(questions) {
    const container = document.getElementById('question-container');

    questions.forEach((item, index) => {
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
        });

        // Add the question wrapper to the container
        container.appendChild(questionWrapper);
    });
}
