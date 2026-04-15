import { StyleSheet } from 'react-native';

/** PostScript names from `@expo-google-fonts/manrope` (must match `useFonts` keys). */
const manrope = {
  medium: 'Manrope_500Medium',
  semiBold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
} as const;

/**
 * Manrope scale from design tokens.
 * - headline: 18/26 bold — screen titles, hero headings
 * - body: 15/20 medium — default paragraph
 * - bodyBold: 15/20 bold — emphasized body, secondary headings
 * - label: 15/20 semibold — UI labels, list titles
 * - caption: 14/20 medium — hints, metadata, timestamps
 */
export const typographyStyles = StyleSheet.create({
  headline: {
    fontFamily: manrope.bold,
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
  },
  body: {
    fontFamily: manrope.medium,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyBold: {
    fontFamily: manrope.bold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  },
  label: {
    fontFamily: manrope.semiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: manrope.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
});
