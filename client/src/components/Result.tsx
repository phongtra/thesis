import { Box, Image, Heading } from '@chakra-ui/react';
import React from 'react';
import { IResult } from '../types';

const Result: React.FC<IResult> = ({
  imageSrc,
  imageAlt,
  voteNumber,
  candidateHeading
}) => {
  return (
    <>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image boxSize='300px' src={imageSrc} alt={imageAlt} />
        <Heading as='h4' size='md' ml='8'>
          {candidateHeading}
        </Heading>
        <Box p='6'>
          <Box d='flex' alignItems='baseline'>
            <Box letterSpacing='wide' fontSize='md' ml='2'>
              Total Vote: {voteNumber}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Result };
