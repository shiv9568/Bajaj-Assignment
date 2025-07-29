const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Utility functions
function isNumber(str) {
    return !isNaN(str) && str.trim() !== '';
}

function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function alternateCapsReverse(str) {
    const reversed = str.split('').reverse();
    return reversed.map((ch, idx) =>
        idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join('');
}

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Input validation
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            error: "'data' should be an array of strings"
        });
    }

    // User info (customize your own below)
    const user_id = "shivansh_bhatia_29072025";
    const email = "shivansh.bhatia@example.com";
    const roll_number = "2110991212";

    // Data processing
    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let collectedAlphabets = "";

    data.forEach(item => {
        if (isNumber(item)) {
            const num = Number(item);
            num % 2 === 0 ? even_numbers.push(String(num)) : odd_numbers.push(String(num));
            sum += num;
        } else if (isAlphabet(item)) {
            alphabets.push(item.toUpperCase());
            collectedAlphabets += item;
        } else {
            special_characters.push(item);
        }
    });

    const concat_string = alternateCapsReverse(collectedAlphabets);

    // Response
    const result = {
        is_success: true,
        user_id,
        email,
        roll_number,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: String(sum),
        concat_string
    };

    res.status(200).json(result);
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}/bfhl`);
});
