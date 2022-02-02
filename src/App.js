import { Layout } from './components/Layout';

import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Layout/>
    </GlobalProvider>
  );
}

export default App;
