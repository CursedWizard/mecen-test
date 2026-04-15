import type { SharedValue } from 'react-native-reanimated';

export type DsTabItem = {
  key: string;
  label: string;
};

export type DsTabProps = {
  items: DsTabItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
  testID?: string;
  onAnimationEnd?: (key?: string) => void;
};

export type TabSegmentProps = {
  index: number;
  label: string;
  selected: boolean;
  onSelect: () => void;
  activeIndex: SharedValue<number>;
};
