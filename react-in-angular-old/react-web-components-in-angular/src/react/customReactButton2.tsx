import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../app/store/store';

export interface IMyReactButtonProps {
  onClick?: () => void;
}

export const CustomReactButton2: FunctionComponent<IMyReactButtonProps> = (props: IMyReactButtonProps) => {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counter.count);
  const timerHandle = useRef<number | null>(null);
  const [stateCounter, setStateCounter] = useState(counter);

  useEffect(() => {
    timerHandle.current = +setInterval(() => {
      setStateCounter(stateCounter + 1);
    }, 3000);

    return () => {
      if (timerHandle.current) {
        clearInterval(timerHandle.current);
        timerHandle.current = null;
      }
    };
  });

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
    dispatch(increment());
  };

  return (
    <div>
        <div>Redux counter: {counter}
          <button type="button" onClick={handleClick}>click to increase</button>
        </div>
        <div>State counter: {stateCounter}</div>
    </div>
  );
};
