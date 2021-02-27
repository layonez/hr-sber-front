import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Header from '../Header';
import TextEditor from './TextEditor';

const useStyles = makeStyles({
  root: {
    margin: '8px',
  },
  title: {
    margin: '32px',
  },
});

export default function CreateArticle() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header title="Create your article" />
      <TextEditor />
      <Toolbar>
        <Button variant="contained" color="primary">
          Create
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}
