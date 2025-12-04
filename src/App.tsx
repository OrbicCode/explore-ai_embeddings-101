import OpenAI from 'openai';
import './App.css';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  async function handleClick() {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: 'Lord of the rings is the best!',
    });
    console.log(response.data[0].embedding);
  }

  return (
    <main>
      <h1>AI Embeddings 101</h1>
      <button onClick={handleClick}>Get Embeddings</button>
    </main>
  );
}

export default App;
