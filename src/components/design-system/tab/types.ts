export type DsTabItem = {
  key: string;
  label: string;
};

export type DsTabProps = {
  items: DsTabItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
  testID?: string;
};

export type TabSegmentProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};
