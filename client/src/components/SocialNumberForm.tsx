import React, { SyntheticEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

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
      toast.success(`${socialNumber} has been registered`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      });
    } catch (e) {
      console.log(e.response.data.error);
      toast.error(e.response.data.error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      });
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

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export { SocialNumberForm };
