import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './Main';
import Detail from './Detail';

function Layout() {
  return (
    <div className="Layout">
      <Switch>
        <Route path="/:num">
          <Detail />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
