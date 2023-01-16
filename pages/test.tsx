import { useEffect, useState } from 'react';
interface ITest {
  first?: any,
  second?: any,
}

export default function Test() {
  const [ selected, setSelected] = useState('');

  const [ testObj, setTestObj ] = useState<ITest>({
    first: '',
    second: '',
  });

  const onCheck = () => {
    const newObj = {
      ...(selected === '1' && { first: 'fist test!' }),
      ...(selected === '2' && { second: 'second test!' }),
    };

    console.log(newObj);
  };

  return (
    <div>
      <button onClick={() => setSelected('1')}>1</button>
      <button onClick={() => setSelected('2')}>2</button>
      <button onClick={onCheck}>CHECK!</button>
    </div>
  );
}