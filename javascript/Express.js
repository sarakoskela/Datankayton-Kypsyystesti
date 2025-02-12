const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/summarize', async (req, res) => {
    const { answers } = req.body;

    try {
        const summary = await getSummaryFromGemini(answers);
        res.status(200).json({ summary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
