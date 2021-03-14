import React from 'react';
import { Box, Flex, Button, Heading, useDisclosure } from '@chakra-ui/react';
import { SocialNumberForm } from './SocialNumberForm';

export const NavBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex position='sticky' top={0} zIndex={1} p={4} bg='#e85e38'>
      <Flex maxW={800} align='center' flex={1} m='auto'>
        <Heading>Blockchain Voting System</Heading>
        <Box ml='auto'>
          <Flex align='center'>
            <Box mr={4}>
              <Button onClick={onOpen} mr={4}>
                Register to the system
              </Button>
            </Box>
            <SocialNumberForm isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
