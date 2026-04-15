import type { ReactNode } from 'react';

export type ErrorHandlerProps = {
  children: ReactNode;
};

export type ErrorHandlerState = {
  hasError: boolean;
  error?: Error;
};
