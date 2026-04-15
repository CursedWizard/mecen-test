import type { ErrorHandlerProps, ErrorHandlerState } from '@/components/error-handler/types';
import { EmptyRequestResult } from '@/components/error-placeholder/ui';
import * as React from 'react';

export class ErrorHandler extends React.Component<ErrorHandlerProps, ErrorHandlerState> {
  public state: ErrorHandlerState = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): ErrorHandlerState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (__DEV__) {
      console.error('Error caught in AppErrorHandler:', error, errorInfo);
    }
  }

  private handleRestart = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <EmptyRequestResult message="Что-то пошло не так" onGoHome={this.handleRestart} />
      );
    }

    return this.props.children;
  }
}
