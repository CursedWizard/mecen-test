import { useCallback, useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export const useGetKeyboardHeight = (offset = 0) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height + offset);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [offset]);

  const hideKeyboard = useCallback(() => {
    setKeyboardHeight(0);
    Keyboard.dismiss();
  }, []);
  return { keyboardHeight, hideKeyboard };
};
