import * as React from 'react';

export interface PickerProps {
   options;
   onPick;
}

export function Picker(props: PickerProps) {

   function handleSelect(e) {
      props.onPick(e.target.value);
   }

   return (
      <div>
         <select onChange={handleSelect}>
            <option value="words">Words</option>
            <option value="passage">Passage</option>
         </select>
      </div>
   );
}
