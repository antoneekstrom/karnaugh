import React, { useState } from 'react';
import configureStore, { createStoreEnhancer } from './store';
import Frame from './components.ui/Frame';
import KarnaughPage from './pages/MainPage';
import actionLogger from './middleware/actionlogger';

import './components.ui/List';
import './resources/css/style.css';
import { Switch, Route } from 'react-router';
import DebugPage from './pages/DebugPage';

function init() {
  return configureStore();
}

function App() {
  const [{store, history}] = useState(init());

  return (
    <Frame history={history} store={store}>
      <Switch>
        <Route path="/" component={KarnaughPage} />
        <Route path="/debug" component={DebugPage} />
      </Switch>
    </Frame>
  )
}

export default App;