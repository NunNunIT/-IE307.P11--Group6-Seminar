import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function App() {
  const video = React.useRef(null);
  const secondVideo = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [statusSecondVideo, setStatusSecondVideo] = React.useState({});

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View className="mb-4 flex flex-row items-center justify-center gap-3">
        <Button onPress={() => video.current.playFromPositionAsync(5000)}>
          <Text>Play from 5s</Text>
        </Button>
        <Button onPress={() => video.current.setIsLoopingAsync(!status.isLooping)}>
          <Text>{status.isLooping ? 'Set to not loop' : 'Set to loop'}</Text>
        </Button>
      </View>
      <Video
        ref={secondVideo}
        style={styles.video}
        source={require('~/assets/video/demo.mp4')}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatusSecondVideo}
      />
      <View className="flex flex-row items-center justify-center gap-3">
        <Button onPress={() => secondVideo.current.playFromPositionAsync(50000)}>
          <Text>Play from 50s</Text>
        </Button>
        <Button onPress={() => secondVideo.current.setIsLoopingAsync(!statusSecondVideo.isLooping)}>
          <Text>{statusSecondVideo.isLooping ? 'Set to not loop' : 'Set to loop'}</Text>
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
