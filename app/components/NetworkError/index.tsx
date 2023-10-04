import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import color from '../../modules/Color';
import { MediumText } from '../Text';

const Height = 35;
const Width = 130;
const WIFI_IMAGE = require('../../assets/icons/no_internet/wifi.png')

interface NetworkProps {
    label: string,
    style: any
}
const NetworkError =(props : NetworkProps )=> {
        return (
            <View style={[styles.errorBotton, props.style]}>
                <Image style={styles.wifi} source={WIFI_IMAGE} />
                <MediumText style={styles.notificationText}>
                    {props.label}
                </MediumText>
            </View>
        );
    
}

const styles = StyleSheet.create({

    notificationText: {
        fontSize: 12,
        color: color.white,
    },
    errorBotton: {
        flexDirection: 'row',
        backgroundColor: color.gold,
        height: Height,
        width: Width,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: color.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 7.49,
        elevation: 4,
        borderRadius: 15,
    },
    wifi: {
        width: 12,
        height: 12,
        marginRight: 10
    }
});


export default NetworkError