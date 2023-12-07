import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Octicons } from '@expo/vector-icons';

export default DatePickerComponent = ({ onDateChange, Text }) => {

    // Fechas
    const [ComponentDate, setComponentDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || ComponentDate;
        setShowDatePicker(false);
        setComponentDate(currentDate);
        onDateChange(currentDate);
    };

    return (
        <>
            <Button textColor="#333" buttonColor="#ECECEC" style={{ marginBottom: 20, height: 47, width: "95%",borderRadius: 15, alignItems: 'center', zIndex: 1, flexDirection: 'row', justifyContent: 'center' }} onPress={() => setShowDatePicker(true)}>
                {Text} {ComponentDate.toLocaleDateString()}
                {showDatePicker && (
                <DateTimePicker testID="dateTimePicker" value={ComponentDate} mode="date" is24Hour={false} display="spinner" onChange={handleDateChange} />
            )}
            </Button>
        </>
    );
};
const styles = StyleSheet.create({
    icon: { paddingLeft:40, color: '#333' },
});