import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
// Estilos
import Fonts from '../../../styles/Fonts';
// Redux
import { useSelector } from 'react-redux';

export default CurveGraph = () => {
    const calibrationCurve = useSelector(state => state.calibrationCurve);
    const screenWidth = Dimensions.get("window").width + 30;
    const screenHeight = Dimensions.get("window").height;

    const data = { labels: [0.0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
        datasets: [ { data: [0.019, 0.093, 0.167, 0.296, 0.444, 0.551, 0.699], color: (opacity = 1) => `rgba(130, 191, 83, ${opacity})`, strokeWidth: 3 } ], };

    const chartConfig = { backgroundColor: "##82BF53", backgroundGradientFrom: "#f1f2f3", backgroundGradientTo: "#f1f2f3", decimalPlaces: 1, color: (opacity = 1) => `rgba(130, 191, 83, ${opacity})`, labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, barPercentage: 0.5, useShadowColorFromDataset: false, propsForDots: { r: "5", strokeWidth: "1", stroke: "#82BF76" } };

    return (
        <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
            <Text style={[Fonts.addText, {textAlign: 'center'}]}>{calibrationCurve.name}</Text>
            <LineChart data={data} width={screenWidth} height={screenHeight} chartConfig={chartConfig}/>
        </View>
    );
};