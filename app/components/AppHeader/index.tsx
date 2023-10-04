import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { MediumText } from '../../components/Text';
import color from '../../modules/Color';

const AppHeader = (props: any) => {

    const onBackPress = () => {
        if (props.onPress) {
            props.onPress()
        }
    }

    return (
        <View style={[styles.container, props.mainViewStyle]}>
            <TouchableOpacity onPress = {onBackPress} style={[styles.innerView, props.innerViewStyle]}>
                <Icon
                    name={props.rightIcon ? props.rightIcon : "chevron-thin-left"}
                    size={20}
                    color={props.leftIconColor ? props.leftIconColor : color.black}
                />
                <MediumText style={styles.titleText}>{props.leftTitle ? props.leftTitle : ""}</MediumText>
            </TouchableOpacity>
        </View>
    );
}

const styles              = StyleSheet.create({
  container               : {
    width                 : '100%',
    // borderRadius          : 22,
    justifyContent        : 'center' 
  },      
  innerView               : {
      width               : 50,
      flexDirection       : 'row',
      alignItems          : 'center',
  },
  titleText               : {
    fontSize              : 16,
    color                 : color.grey
  }      
});

export default AppHeader