
import styled from './styled';
import { Text } from 'react-native';

export const Const = {
    BOLD_FONT: 'Roboto-Bold',
    MEDIUM_FONT: 'Roboto-Regular',
    EXO_FONT: "Exo2-ExtraBoldItalic",
};

export const MediumText = styled(Text)(() => {
    return {
        fontFamily: Const.MEDIUM_FONT,
    }
})

export const BoldText = styled(Text)(() => {
    return {
        fontFamily: Const.BOLD_FONT,
    }
})

export const ExoText = styled(Text)(() => {
    return {
        fontFamily : Const.EXO_FONT,
    }
})