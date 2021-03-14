import React, { SyntheticEvent, useState } from 'react';

import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { toastSuccess } from '../utils/toastSuccess';
import { toastError } from '../utils/toastError';
import { Toast } from './common/Toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialNumberForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [socialNumber, setSocialNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (e: SyntheticEvent) => {
    console.log('submitting');
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/register-voter', {
        socialNumber
      });
      toastSuccess(`${socialNumber} has been registered`);
    } catch (e) {
      console.log(e.response.data.error);
      toastError(e.response.data.error);
    }
    setSocialNumber('');
    setLoading(false);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register to voting system</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Social Number: </FormLabel>
                <Input
                  value={socialNumber}
                  onChange={(e) => {
                    setSocialNumber(e.target.value);
                  }}
                />
                <Button isLoading={loading} mt={4} type='submit'>
                  Submit
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Toast />
    </>
  );
};

export { SocialNumberForm };
