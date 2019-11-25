import React from 'react'
import indexRoutes from './routes/'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux'

const App = () => (
  <Provider store={store}>
    <Router basename="/">
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />
        })}
      </Switch>
    </Router>
  </Provider>
)

export default App
