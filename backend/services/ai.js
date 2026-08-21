const axios = require('axios');
async function askQwen(prompt) {
  const res = await axios.post('http://localhost:11434/api/generate', {
    model: 'qwen2.5-coder', prompt, stream: false
  });
  return res.data.response;
}
module.exports = { askQwen };