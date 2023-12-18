import { openai } from './openai.js'
import { Document } from 'langchain/document' //Type of object that every langchain vectors are expecting --> thats the good thing about langchain in normalizes the input no matter what db you use
import { MemoryVectorStore } from 'langchain/vectorstores/memory' // only in memonry db - not persistent
import { OpenAIEmbeddings } from 'langchain/embeddings/openai' // we send data to openai API and it will return embeddings to us
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf.cjs'
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'

const question = process.argv[2]

const video = `https://youtu.be/zR_iuq2evXo?si=cG8rODgRgXOx9_Cn`

export const createStore = (docs) =>
  MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())
