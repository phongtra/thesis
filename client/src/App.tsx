import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SocialNumberForm } from './components/SocialNumberForm';
import { VoteForm } from './components/VoteForm';
import { IResult } from './types';
import { Result } from './components/Result';
import { Container, Heading } from '@chakra-ui/layout';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [donaldTrumpVote, setDonaldTrumptVote] = useState<number | null>(null);
  const [joeBidenVote, setJoeBidenVote] = useState<number | null>(null);
  useEffect(() => {
    axios
      .get<IResult>('http://localhost:5000/vote-result')
      .then(({ data: { joeBidenVote, donaldTrumpVote } }) => {
        setDonaldTrumptVote(donaldTrumpVote);
        setJoeBidenVote(joeBidenVote);
      });
  }, []);
  return (
    <Layout>
      <Heading as='h4'>Welcome to blockchain voting system</Heading>
      <VoteForm />
      <Result joeBidenVote={joeBidenVote} donaldTrumpVote={donaldTrumpVote} />
    </Layout>
  );
};

export default App;
