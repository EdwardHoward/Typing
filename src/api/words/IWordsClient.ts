export interface WordsResult {
   wpm: number;
   wrong: number;
}

export default interface IWordsClient {
   getWords():Promise<string[]>;
   checkWords(words: string, backspaceCount: number):Promise<WordsResult>;
}