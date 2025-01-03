import { Font } from '@react-pdf/renderer';
import NunitoExtraBold from '../assets/fonts/Nunito-ExtraBold.ttf';
import NunitoBold from '../assets/fonts/Nunito-Bold.ttf';
import NunitoSemiBold from '../assets/fonts/Nunito-SemiBold.ttf';
import NunitoExtraLightItalic from '../assets/fonts/Nunito-ExtraLightItalic.ttf';
import NunitoNormal from '../assets/fonts/Nunito-Medium.ttf';
import NunitoLight from '../assets/fonts/Nunito-Light.ttf';

export const getFont = (path) => {
  switch (path) {
    case 'NunitoExtraBold':
      return NunitoExtraBold;
    case 'NunitoSemiBold':
      return NunitoSemiBold;
    case 'NunitoBold':
      return NunitoBold;
    case 'NunitoExtraLightItalic':
      return NunitoExtraLightItalic;
    case 'NunitoNormal':
      return NunitoNormal;
    case 'NunitoLight':
      return NunitoLight;
    default:
      return NunitoNormal;
  }
};

export const FontRegistry = (font) => {
  const fontConfig = { src: getFont(font), family: font };
  Font.register(fontConfig);
  return font;
};

export const formatEnumValues = (enums) => {
  if (Array.isArray(enums)) {
    let concatEnums = '';
    enums.forEach((value) => {
      concatEnums += `'${value}'; `;
    });
    return concatEnums;
  }
  return JSON.stringify(enums);
};

export function capitalizeFirstLetter(str) {
  const res = str.replace(/_/gi, ' ');
  return res.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

