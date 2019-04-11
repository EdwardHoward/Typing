export interface WordsResult {
   wpm: number;
   wrong: number;
}

export enum WordsType {
   WORDS = "words",
   PASSAGE = "passage"
}

export default interface IWordsClient {
   getWords(type: WordsType):Promise<string[]>;
   checkWords(words: string, backspaceCount: number):Promise<WordsResult>;
}