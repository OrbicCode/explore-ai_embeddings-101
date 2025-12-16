import OpenAI from 'openai';
import './App.css';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type Arr = {
  content: string;
  embedding: number[];
};

const content = ['Lord of the rings is the best!', 'Star wars comes next as second best'];
const arr: Arr[] = [];

function App() {
  async function handleClick() {
    async function main(input: string[]) {
      await Promise.all(
        input.map(async (textChunk) => {
          const response = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: textChunk,
          });
          const dataObj = {
            content: textChunk,
            embedding: response.data[0].embedding,
          };
          arr.push(dataObj);
        })
      );
      console.log('all embeddings complete');
      console.log(arr);
    }
    main(content).catch((e) => console.error(e));
  }

  return (
    <main>
      <h1>AI Embeddings 101</h1>
      <button onClick={handleClick}>Get Embeddings</button>
    </main>
  );
}

export default App;
