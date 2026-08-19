import Image, { type ImageProps } from 'next/image';

export default function AppImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} {...props} />;
}
