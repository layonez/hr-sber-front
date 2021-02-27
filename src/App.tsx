import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Blog from './components/Blog';
import CreateArticle from './components/CreateArticle';
import CreateSurvey from './components/CreateSurvey';
import ExampleSurvey from './components/ExampleSurvey';
import Footer from './components/Footer';

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/article">
            <CreateArticle />
          </Route>
          <Route path="/survey/example">
            <ExampleSurvey />
          </Route>
          <Route path="/survey">
            <CreateSurvey />
          </Route>
          <Route path="/">
            <Blog />
          </Route>
        </Switch>
      </Router>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
};

export default App;
