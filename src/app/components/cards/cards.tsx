import { JsxElement } from 'typescript';
import Card from './card';
export default function cards() {
  let arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className='w-full justify-center flex flex-wrap items-center'>
      {arr.map((a, i) => (
        <Card key={a} />
      ))}
    </div>
  );
}
