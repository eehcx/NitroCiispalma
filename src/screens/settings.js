import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button, Text, Switch  } from 'react-native-paper';

export default SettingsScreen = ({ navigateToScreen }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text variant="headlineMedium">Settings!</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});