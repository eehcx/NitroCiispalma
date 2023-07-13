import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default LogoutScreen = ({ navigateToScreen }) => {
    const tittleDialog = 'This is a title';
    const contentDialog = 'This is simple dialog';
    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={styles.title}>{tittleDialog}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{contentDialog}</Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
})