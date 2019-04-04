import IWordsClient, { WordsResult } from "../IWordsClient";
import axios from 'axios';

export default class APIWordsClient implements IWordsClient{
   getWords(){
      return new Promise<string[]>(async (resolve, reject) => {
         let res = await axios(process.env.API_URL, {withCredentials: true});

         resolve(res.data.words.split("|"));

      });
   }

   checkWords(words: string, backspaceCount: number){
      return new Promise<string>(async (resolve, reject) => {
         let res = await axios(`${process.env.API_URL}/check`, {
            method: 'post',
            withCredentials: true,
            headers: {'Content-Type': 'application/json'},
            data: {words, backspaceCount}
         });

         resolve(res.data);
      });
   }
}