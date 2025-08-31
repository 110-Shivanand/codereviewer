const axios = require('axios');
require('dotenv').config();

async function reviewCode(code) {
  //  console.log(process.env.GROQ_API_KEY)
  const prompt = `
You're a professional code reviewer. Analyze the following code and provide a structured response with:
1. 🔍 Which line(s) have error(s) or bad practices (if any),
2. ✅ How to fix or improve those lines,
3. 🧠 A fully optimized version of the code.

Only respond with:
- ⚠️ Errors with line numbers
- 🔧 Fix suggestions
- 💡 Optimized full code

Here is the code:

${code}
`
;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 1500
      },
      {
        headers: { // uncomment the below line to get api services
        //  'Authorization':`Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('GROQ API Error:', error.response?.data || error.message);
    return 'Error analyzing the code.';
  }
}

module.exports = reviewCode;
