import { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-orange-100 p-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
            asdfasdf
            <Header />
            <Main />
            <div className="p-4 flex justify-end">
              <ErrorButton />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
