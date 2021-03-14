import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VoteForm } from './components/VoteForm';
import { IVoteResultResponse } from './types';
import { Result } from './components/Result';
import { Layout } from './components/Layout';
import { Flex } from '@chakra-ui/layout';

const App: React.FC = () => {
  const [donaldTrumpVote, setDonaldTrumptVote] = useState<number | null>(null);
  const [joeBidenVote, setJoeBidenVote] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  useEffect(() => {
    axios
      .get<IVoteResultResponse>('http://localhost:5000/vote-result')
      .then(({ data: { joeBidenVote, donaldTrumpVote } }) => {
        setDonaldTrumptVote(donaldTrumpVote);
        setJoeBidenVote(joeBidenVote);
      });
  }, [voted]);
  return (
    <Layout>
      <VoteForm voted={voted} setVoted={setVoted} />
      <Flex>
        <Result
          voteNumber={joeBidenVote}
          imageSrc='joe-biden.jpeg'
          imageAlt='Joe Biden'
          candidateHeading='Joe Biden'
        />
        <Result
          voteNumber={donaldTrumpVote}
          imageSrc='donald-trump.jpeg'
          imageAlt='Donald Trump'
          candidateHeading='Donald Trump'
        />
      </Flex>
    </Layout>
  );
};

export default App;
