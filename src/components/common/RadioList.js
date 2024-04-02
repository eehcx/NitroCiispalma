import React, { useState, useEffect } from 'react';
//React Native
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Firebase
import { app } from '../../app/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
// React Native Paper
import { PaperProvider, RadioButton, Divider } from 'react-native-paper';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { update, selectCurrentForm, setForm } from '../../features/forms/ReportSlice';

const RadioItem = ({value, title, content}) => {
    const dispatch = useDispatch();
    const [selectedPackage, setSelectedPackage] = useState('');
    const packageId = useSelector(state => state.report.uid_package);
    const currentForm = useSelector(selectCurrentForm);

    const handleRadioButtonPress = (packageId) => {
        setSelectedPackage(packageId);
        dispatch(update({ uid_package: packageId }));
        dispatch(setForm(currentForm + 1));
    };

    return(
        <>
            <TouchableOpacity className='flex-row items-center justify-between py-3'>
                <Icon className='px-4' name="landslide" size={24} color='#767983'/>
                <View className='flex-col items-start'>
                    <Text className='ml-3 text-slate-500 text-base'>{title}</Text>
                    <Text className='ml-3 text-slate-500 text-base'>{content}</Text>
                </View>
                <RadioButton.Item color='#167139' value={value} status={packageId === value ? 'checked' : 'unchecked'} onPress={() => handleRadioButtonPress(value)} />
            </TouchableOpacity>
            <Divider className=' my-1 bg-neutral-300' />
        </>
    );
}

const RadioList = ({ packageName }) => {
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    // Paquetes suelos
    const [Data, setData] = useState([]);

    useEffect(() => {
        const database = getDatabase(app);
        const paquetesRef = ref(database, 'paquetes');
        const onPaqueteValue = onValue(paquetesRef, (snapshot) => {
            const data = snapshot.val();
            const PaqueteArray = data ? Object.values(data) : [];
            const soilsPackages = PaqueteArray.filter((paquete) => paquete.tipo === packageName);
            setData(soilsPackages);
        });
        return () => {
            off(paquetesRef, 'value', onPaqueteValue);
        };
    }, []);

    return(
        <View className='flex-1 bg-zinc-50'>
            <PaperProvider>
                <SafeAreaView className='flex-grow'>
                    <ScrollView onScroll={onScroll}>
                        {Data.slice().reverse().map((item, index) => (
                            <View key={index}>
                                <RadioItem value={item.uid} title={item.nombre} content={item.uid} />
                            </View>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </PaperProvider>
        </View>
    );
};

export default RadioList;