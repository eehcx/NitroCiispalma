import * as React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { Button, TouchableRipple, Text, Switch, List, Divider, Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { handleLogout } from '../utils/auth/authentication';

export default SettingsScreen = ({ navigateToScreen }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
      <View>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Appbar.Header style={{ backgroundColor: '#fafafa' }}>
          <Appbar.Content title="Configuración y Privacidad" />
        </Appbar.Header>
        <View style={{ borderTopWidth: 1, borderTopColor: '#fafafa' }}>
          <List.Section>
            <List.Item
              title="Full name"
              description="Margot Foster"
              left={() => <MaterialIcons name="person" size={24} color="#000" />}
            />
            <Divider />
            <List.Item
              title="Application for"
              description="Backend Developer"
              left={() => <MaterialIcons name="accessibility" size={24} color="#000" />}
            />
            <Divider />
            <List.Item
              title="Email address"
              description="margotfoster@example.com"
              left={() => <MaterialIcons name="email" size={24} color="#000" />}
            />
            <Divider />
            <List.Item
              title="Salary expectation"
              description="$120,000"
              left={() => <MaterialIcons name="category" size={24} color="#000" />}
            />
            <Divider />
            <List.Item
              title="About"
              description={`Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.`}
              left={() => <MaterialIcons name="info" size={24} color="#000" />}
            />
            <Divider />
          </List.Section>
          <Button textColor='#d41717' mode="default" onPress={() => navigateToScreen('logout')}>
            Cerrar Sesión
          </Button>
          <Button textColor='#0078d4' mode="default" onPress={() => handleLogout(navigateToScreen)}>
            Crear otra Cuenta
          </Button>
        </View>
      </View>
    );
};