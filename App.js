import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Navigation from './src/navigation/index';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
        <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    justifyContent: 'center',
  },
});

export default App;
