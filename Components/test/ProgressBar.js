import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => (
  <Progress.Bar
    progress={progress}
    width={null}
    color="#5a8df4"
    borderRadius={5}
    height={10}
    style={styles.progressBar}
  />
);

const styles = StyleSheet.create({
  progressBar: {
    marginVertical: 20,
  },
});

export default ProgressBar;
