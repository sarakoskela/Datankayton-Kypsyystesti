import '../node_modules/dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getGeminiAnalysis(answersData) {
    const prompt = `Analysoi seuraavat käyttäjän vastaukset kyselyyn ja anna lyhyt yhteenveto:
    
    ${JSON.stringify(answersData.answers, null, 2)}
    
    Anna lyhyt ja ystävällinen analyysi.`;

    try {
        const result = await model.generateContent([prompt]);
        return result.responses[0]?.text || "No analysis generated.";
    } catch (error) {
        console.error("Error during Gemini analysis:", error);
        throw error;
    }
}

export function displayAnalysis() {
    getGeminiAnalysis(answersData)
        .then(result => {
            document.getElementById('question-container').innerHTML = `
                <h3>Thank you for participating in the questionnaire!</h3>
                <p>Here's a summary of your responses:</p>
                <div>${result}</div>
            `;

            const nextButton = document.getElementById('next-button');
            if (nextButton) nextButton.style.display = 'none';

            // Log the answers data for debugging or saving
            console.log('User Answers:', JSON.stringify(answersData, null, 2));
        })
        .catch(error => {
            console.error('Error with Gemini analysis:', error);
            document.getElementById('question-container').innerHTML = `
                <h3>Thank you for participating in the questionnaire!</h3>
                <p>Unfortunately, we couldn't generate the analysis at this time.</p>
            `;
        });
}

