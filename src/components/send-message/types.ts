import { StyleProp, ViewStyle } from "react-native";

export type DsSendMessageProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  editable?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};
