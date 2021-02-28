import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import CreateArticle from './components/CreateArticle';
import CreateArticleDemo from './components/CreateArticleDemo';
import ShowArticle from './components/ShowArticle';
import CreateSurvey from './components/CreateSurvey';
import ExampleSurvey from './components/ExampleSurvey';
import Footer from './components/Footer';
import Feed from './components/Feed';
import Header from './components/Header';
import Container from '@material-ui/core/Container';

const Copyright: React.FC = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}

      <Link color='inherit' href='https://material-ui.com/'>
        Sber Creator Studio
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

const sections = [
  { title: 'Технологии', url: '#Technology' },
  { title: 'Дизайн', url: '#Design' },
  { title: 'Культура компании', url: '#Culture' },
  { title: 'Стартапы', url: '#Business' },
];

const App: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Header title='ПУЛЬС' sections={sections} />
      <Router>
        <Switch>
          <Route path='/article/:id'>
            <ShowArticle />
          </Route>
          <Route path='/share'>
            <CreateArticleDemo />
          </Route>
          <Route path='/article'>
            <CreateArticle />
          </Route>
          <Route path='/survey/example'>
            <ExampleSurvey />
          </Route>
          <Route path='/survey'>
            <CreateSurvey />
          </Route>
          <Route path='/' default>
            <Feed />
          </Route>
        </Switch>
      </Router>
      <Footer
        title='Footer'
        description='Something here to give the footer a purpose!'
      />
    </Container>
  );
};

export default App;
