import { Image, StyleSheet, View } from 'react-native';

import { useCamera } from '~/components/CameraProvider';

export default function ImageReview() {
  const { photoUri } = useCamera();
  return (
    photoUri && (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.image} />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // marginBottom: 20,
    objectFit: 'contain',
  },
});
