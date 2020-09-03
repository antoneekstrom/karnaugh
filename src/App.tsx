import React, { useState } from 'react';
import configureStore from './store';
import * as Typography from './components.ui/Typography';
import Frame from './components.ui/Frame';
import KarnaughGrid from './components.karnaugh/KarnaughGrid';
import { karnaugh } from './model/index';
import Panel from './components.ui/Panel';
import Paper from './components.ui/Paper';
import KarnaughPage from './pages/KarnaughPage';

function init() {
  Typography.loadStyle();
  return configureStore();
}

function App() {
  const [{store, history}] = useState(init());

  return (
    <Frame history={history} store={store}>
      <KarnaughPage/>
    </Frame>
  )
}

export default App;