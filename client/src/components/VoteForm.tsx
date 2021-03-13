import { Button } from '@chakra-ui/button';
import axios from 'axios';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React, { SyntheticEvent, useState } from 'react';
import { toastSuccess } from '../utils/toastSuccess';
import { toastError } from '../utils/toastError';

const VoteForm: React.FC = () => {
  const [socialNumber, setSocialNumber] = useState('');
  const [candidate, setCandidate] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!candidate) {
      console.log('Must select a candidate');
    }
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/us-election-vote', {
        socialNumber,
        candidate
      });
      toastSuccess(`${socialNumber} has voted for ${candidate}`);
    } catch (e) {
      console.log(e.response.data.error);
      toastError(e.response.data.error);
    }
    setSocialNumber('');
    setLoading(false);
  };
  return (
    <>
      <Heading as='h3' size='lg'>
        Here is the US Election vote, choose your candidate
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl mt={4}>
          <FormLabel>Your Social Number</FormLabel>
          <Input
            value={socialNumber}
            onChange={(e) => setSocialNumber(e.target.value)}
          />
          <FormLabel mt={4}>Choose one</FormLabel>
          <Select
            defaultValue=''
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
          >
            <option value=''></option>
            <option value='Joe Biden'>Joe Biden</option>
            <option value='Donald Trump'>Donald Trumpt</option>
          </Select>
          <Button isLoading={loading} mt={4} mb={4}>
            Vote
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export { VoteForm };
