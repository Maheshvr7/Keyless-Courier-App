import React, { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { StyleSheet, Dimensions, ActivityIndicator, View, StatusBar,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetworkError from '../NetworkError';
import color from '../../modules/Color';
const height = Dimensions.get('window').height

type SafeAreaProps = {
    translucent?: boolean;
    darkContent?: boolean;
    backgroundColor?: string;
    showLoadingIndicator?: boolean;
    children?: any;
    edges?:any;
    style?: any;
}

const CustomSafeAreaView = (props: SafeAreaProps) => {
    const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        handleConnectivity()
        return (() => {
		})
    });

    const handleConnectivity = () => {
        NetInfo.addEventListener(state => setIsConnected(state.isConnected || false))
    }

  return (
      <>
          <StatusBar translucent = { props.translucent ? props.translucent : false} barStyle={props.darkContent ? 'dark-content' : 'light-content'} backgroundColor = {props.backgroundColor ? props.backgroundColor : "transparent"}/>
          <SafeAreaView
					edges={props.edges ? props.edges : ['right','left',]}
                    style={[styles.container, props.style]}
				>
              {props.showLoadingIndicator ?
                  <View style={styles.loader}>
                      <ActivityIndicator size='large' />
                  </View>
                  : null
              }
              {props.children}
              {!isConnected ? <NetworkError style={styles.popup} label="Network Error" /> : null}
          </SafeAreaView>
      </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    popup: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: height - 100,
        zIndex: 2
    },
    loader: {
        zIndex: 999,
        height: 50,
        width: 50,
        left: (Dimensions.get('window').width / 2) - 25,
        top: (Dimensions.get('window').height / 2) - 25,
        position: 'absolute',
    }
});
export default CustomSafeAreaView