import { AVPlaybackStatus, AVPlaybackStatusSuccess, ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { StatusBar } from 'expo-status-bar';
import { Text } from '~/components/ui/text';

export default function App() {
  const video = useRef<Video>(null);
  const secondVideo = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>();
  const [statusSecondVideo, setStatusSecondVideo] = useState<AVPlaybackStatus | null>(null);

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View className="mb-4 flex flex-row items-center justify-center gap-3">
        <Button onPress={() => video.current?.playFromPositionAsync(5000)}>
          <Text>Play from 5s</Text>
        </Button>
        <Button onPress={() => video.current?.setIsLoopingAsync(("isLooping" in (status ?? {})) ? !(status as AVPlaybackStatusSuccess)?.isLooping : false)}>
          <Text>{(status as AVPlaybackStatusSuccess)?.isLooping ? 'Set to not loop' : 'Set to loop'}</Text>
        </Button>
      </View>
      <Video
        ref={secondVideo}
        style={styles.video}
        source={require('~/assets/video/demo.mp4')}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={setStatusSecondVideo}
      />
      <View className="flex flex-row items-center justify-center gap-3">
        <Button onPress={() => secondVideo.current?.playFromPositionAsync(50000)}>
          <Text>Play from 50s</Text>
        </Button>
        <Button onPress={() => secondVideo.current?.setIsLoopingAsync(("isLooping" in (statusSecondVideo ?? {})) ? !(statusSecondVideo as AVPlaybackStatusSuccess)?.isLooping : false)}>
          <Text>{(statusSecondVideo as AVPlaybackStatusSuccess)?.isLooping ? 'Set to not loop' : 'Set to loop'}</Text>
        </Button>
      </View>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
