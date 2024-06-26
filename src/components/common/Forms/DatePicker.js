import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

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
            <Button textColor="#6b7280" buttonColor="#e2e8f0" style={{ marginBottom: 20, height: 47, width: "95%",borderRadius: 15, alignItems: 'center', zIndex: 1, flexDirection: 'row', justifyContent: 'center' }} onPress={() => setShowDatePicker(true)}>
                {Text} {ComponentDate.toLocaleDateString()}
                {showDatePicker && (
                <DateTimePicker testID="dateTimePicker" value={ComponentDate} mode="date" is24Hour={false} display="spinner" onChange={handleDateChange} />
            )}
            </Button>
        </>
    );
};