export default interface IWordsClient {
   getWords():Promise<string[]>;
   checkWords(words: string, backspaceCount: number):Promise<string>;
}