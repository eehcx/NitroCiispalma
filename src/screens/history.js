import React, { useEffect, useState } from 'react';
//REACT NATIVE Y TAILWIND CSS
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
// React Native Paper
import { Avatar, Card, Divider, PaperProvider, Text } from 'react-native-paper';
// Firebase
import { app } from '../utils/firebase';
import { getDatabase, ref, onValue, off, get } from 'firebase/database';

const HistoryScreen = () => {
    const db = getDatabase(app);
    const [historialData, setHistorialData] = useState([]);

    const fetchData = async () => {
        try {
          const calculosRef = ref(db, 'calculos');
          const snapshot = await get(calculosRef);
          const calculosData = snapshot.val();
    
          if (calculosData) {
            const historialArray = [];
    
            Object.keys(calculosData).forEach((calculoKey) => {
              const calculo = calculosData[calculoKey];
              const CE = calculo.CE && calculo.CE.uid ? calculo.CE.uid : 'N/A';
              const MO = calculo.MO && calculo.MO.uid ? calculo.MO.uid : 'N/A';
    
              const historialItem = {
                calculoUid: calculoKey,
                CEUid: CE,
                MOUid: MO,
              };
    
              historialArray.push(historialItem);
            });
    
            setHistorialData(historialArray);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <PaperProvider>
            <SafeAreaView style={[styles.container]}>
                {historialData.map((item, index) => (
                    <View key={index}>
                    <Card.Title
                        title={`Cálculo UID: ${item.calculoUid}`}
                        left={(props) => <Avatar.Text style={{backgroundColor: "#82c491"}} size={48} label="C" />} />
                    <Divider />
                    <Card.Content>
                        <View>
                        <Text>CE UID: {item.CEUid}</Text>
                        <Text>MO UID: {item.MOUid}</Text>
                        </View>
                    </Card.Content>
                    </View>
                ))}
            </SafeAreaView>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 10, marginBottom: 5 }
});


export default HistoryScreen;