import * as React from 'react';

import type { MessageCloudActionButtonProps } from '../types';
import { DsButtonAction } from './ds-button-action';
import { MessageCloudActionIcon } from './message-cloud-action-icon';

export function MessageCloudActionButton(props: MessageCloudActionButtonProps) {
  return <DsButtonAction {...props} renderIcon={(ctx) => <MessageCloudActionIcon {...ctx} />} />;
}
