import { openai } from './openai.js'
import { Document } from 'langchain/document' //Type of object that every langchain vectors are expecting --> thats the good thing about langchain in normalizes the input no matter what db you use
import { MemoryVectorStore } from 'langchain/vectorstores/memory' // only in memonry db - not persistent
import { OpenAIEmbeddings } from 'langchain/embeddings/openai' // we send data to openai API and it will return embeddings to us

const movies = [
  {
    id: 1,
    title: 'Stepbrother',
    description: `Comedic journey full of adult humor and awkwardness.`,
  },
  {
    id: 2,
    title: 'The Matrix',
    description: `Deals with alternate realities and questioning what's real.`,
  },
  {
    id: 3,
    title: 'Shutter Island',
    description: `A mind-bending plot with twists and turns.`,
  },
  {
    id: 4,
    title: 'Memento',
    description: `A non-linear narrative that challenges the viewer's perception.`,
  },
  {
    id: 5,
    title: 'Doctor Strange',
    description: `Features alternate dimensions and reality manipulation.`,
  },
  {
    id: 6,
    title: 'Paw Patrol',
    description: `Children's animated movie where a group of adorable puppies save people from all sorts of emergencies.`,
  },
  {
    id: 7,
    title: 'Interstellar',
    description: `Features futuristic space travel with high stakes`,
  },
]

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (movie) =>
        new Document({
          pageContent: `Title: ${movie.title}\n${movie.description}`, // this pageContent is the stuff I want to turn into a vector and put inside of a multi-dimensional space and people can query it
          metadata: { source: movie.id, title: movie.title }, // this is structured of the non-structured pageContent in order to retrieve or generate links etc. later
        })
    ),
    new OpenAIEmbeddings({
      openAIapiKey: process.env.OPENAI_API_KEY,
    }) // this is making API call to openAi API and expecting env variables and openAI key. It converts our document into a embeddings which are a list of vectors to do math for it and calculate which semantic movie is the closest
  )

const search = async (query, count = 1) => {
  // count returns the number of movies which should be returned and order them by their closeset values
  const store = await createStore()
  return store.similaritySearchWithScore(query, count) // the "cosine" similarity is just doing math on all the vectors and checks how close they are to each other --> here are many more search-methods
}

console.log(await search('A movie that makes me crazy'))
