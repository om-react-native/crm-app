import { ImageSourcePropType } from 'react-native';

interface CustomImages {
  appLogo: ImageSourcePropType;
}

const CustomImages: CustomImages = {
  appLogo: require('./crm.webp'),
};

export default CustomImages;
