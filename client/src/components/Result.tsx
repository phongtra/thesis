import React from 'react';
import { IResult } from '../types';

const Result: React.FC<IResult> = ({ joeBidenVote, donaldTrumpVote }) => {
  return (
    <>
      <h2>Result</h2>
      <p>Joe Biden: {joeBidenVote || 'Loading'}</p>
      <p>Donald Trump: {donaldTrumpVote || 'Loading'}</p>
    </>
  );
};

export { Result };
