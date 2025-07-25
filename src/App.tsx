import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Main } from './pages/Main';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Header } from './components/Header';

/*default class App extends Component {
  render() {
    return (
      
        <div className="min-h-screen bg-orange-100 p-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
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
}*/

export function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        <Route path="/page/:page" element={<Main />} />
        <Route path="/page/:page/details/:name" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
