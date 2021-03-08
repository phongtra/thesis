import { Box } from '@chakra-ui/react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrappper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular'
}) => {
  return (
    <Box
      maxW={variant === 'regular' ? '800px' : '400px'}
      w='100%'
      mt={8}
      mx='auto'
    >
      {children}
    </Box>
  );
};
