import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const CounterUp = ({ start = 0, end }) => {
  const [state, setState] = useState(null);
  const ref = useRef(start);
  const accumulator = end / 200;

  const updateCounterState = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + accumulator);
      if (result > end) return setState(end);
      setState(result);
      ref.current = result;
      setTimeout(updateCounterState, 50);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      updateCounterState();
    }
    return () => (isMounted = false);
  }, [start, end]);

  return <>{state}</>;
};

export default CounterUp;
