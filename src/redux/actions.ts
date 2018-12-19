export enum Action {
   INCREMENT_COUNTER,
   SET_TIME
}

export function addAction(value: number) {
   return { type: Action.INCREMENT_COUNTER, value };
}