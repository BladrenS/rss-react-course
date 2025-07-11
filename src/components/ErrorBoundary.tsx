import { Component, ErrorInfo, ReactNode } from 'react';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-700 text-center p-4 bg-red-100">
          Something went wrong. Please refresh.
        </div>
      );
    }

    return this.props.children;
  }
}
