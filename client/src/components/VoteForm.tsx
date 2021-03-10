import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React from 'react';

const VoteForm: React.FC = () => {
  return (
    <>
      <Heading as='h3' size='lg'>
        Here is the US Election vote, choose your candidate
      </Heading>
      <form>
        <FormControl mt={4}>
          <FormLabel>Your Social Number</FormLabel>
          <Input />
          <FormLabel mt={4}>Choose one</FormLabel>
          <Select>
            <option>Joe Biden</option>
            <option>Donald Trumpt</option>
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
