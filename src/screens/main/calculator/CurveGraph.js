import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
// Estilos
import Fonts from '../../../styles/Fonts';
// Redux
import { useSelector } from 'react-redux';
import { CurrentName } from '../../../features/calc/CalibrationCurveSlice';

export default CurveGraph = () => {
    const currentName = useSelector(CurrentName);
    // Listados de datos
    const Data = useSelector(state => state.calibrationCurve.curveData);
    const Abs = Data.map(item => parseFloat(item.abs).toFixed(3));
    const Concentration = Data.map(item => parseFloat(item.concentracion).toFixed(1));

    const screenWidth = Dimensions.get("window").width + 30;
    const screenHeight = Dimensions.get("window").height;

    const data = { labels: Concentration,
        datasets: [ { data: Abs, color: (opacity = 1) => `rgba(130, 191, 83, ${opacity})`, strokeWidth: 3 } ], };

    const chartConfig = { backgroundColor: "##82BF53", backgroundGradientFrom: "#f1f2f3", backgroundGradientTo: "#f1f2f3", decimalPlaces: 2, color: (opacity = 1) => `rgba(130, 191, 83, ${opacity})`, labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, barPercentage: 0.5, useShadowColorFromDataset: false, propsForDots: { r: "5", strokeWidth: "1", stroke: "#82BF76" } };

    return (
        <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
            <Text style={[Fonts.addText, {textAlign: 'center'}]}>{currentName}</Text>
            <LineChart data={data} width={screenWidth} height={screenHeight} chartConfig={chartConfig}/>
        </View>
    );
};
