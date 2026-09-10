import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Stack,
  Text,
} from "native-base";

type CardProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

export default function Card({
  image,
  title,
  subtitle,
  description,
}: CardProps) {
  return (
    <Box alignItems="center" mt={6}>
      <Box maxW="80" rounded="lg" overflow="hidden" borderWidth="1">
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image source={{ uri: image }} alt={title} />
        </AspectRatio>

        <Stack p="4" space={3}>
          <Heading size="md">{title}</Heading>
          <Text fontSize="xs" color="muted.900">   
            {subtitle}
          </Text>
          <Text>{description}</Text>
        </Stack>
      </Box>
    </Box>
  );
}