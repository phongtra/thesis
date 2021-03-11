import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React, { SyntheticEvent, useState } from 'react';

const VoteForm: React.FC = () => {
  const [socialNumber, setSocialNumber] = useState('');
  const [candidate, setCandidate] = useState('');
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!candidate) {
      console.log('Must select a candidate');
    }
    console.log(socialNumber);
    console.log(candidate);
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
          <Button mt={4} mb={4}>
            Vote
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export { VoteForm };
