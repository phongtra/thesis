import React from 'react';
import { IResult } from '../types';

const Result: React.FC<IResult> = ({ joeBidenVote, donaldTrumpVote }) => {
  return (
    <>
      <h2>Result</h2>
      <p>Joe Biden: {joeBidenVote}</p>
      <p>Donald Trump: {donaldTrumpVote}</p>
    </>
  );
};

export { Result };
