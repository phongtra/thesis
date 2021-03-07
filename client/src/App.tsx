import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SocialNumberForm } from './components/SocialNumberForm';
import { VoteForm } from './components/VoteForm';
import { IResult } from './types';
import { Result } from './components/Result';

const App: React.FC = () => {
  const [donaldTrumpVote, setDonaldTrumptVote] = useState<number>(0);
  const [joeBidenVote, setJoeBidenVote] = useState<number>(0);
  useEffect(() => {
    axios
      .get<IResult>('http://localhost:5000/vote-result')
      .then(({ data: { joeBidenVote, donaldTrumpVote } }) => {
        setDonaldTrumptVote(donaldTrumpVote);
        setJoeBidenVote(joeBidenVote);
      });
  }, []);
  return (
    <div>
      <h1>Welcome to blockchain voting system</h1>
      <SocialNumberForm />
      <VoteForm />
      <Result joeBidenVote={joeBidenVote} donaldTrumpVote={donaldTrumpVote} />
    </div>
  );
};

export default App;
