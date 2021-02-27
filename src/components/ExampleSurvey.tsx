import React from 'react';
import { Model, Survey } from 'survey-react';
import 'survey-react/survey.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Header from './Header';

const useStyles = makeStyles({
  root: { margin: '8px' },
  title: {
    margin: '32px',
  },
});

const json = {
  completedHtml:
    '<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>',
  completedHtmlOnCondition: [
    {
      expression: '{nps_score} > 8',
      html:
        '<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>',
    },
    {
      expression: '{nps_score} < 7',
      html:
        '<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br/>',
    },
  ],
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'rating',
          name: 'nps_score',
          title:
            'On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?',
          isRequired: true,
          rateMin: 0,
          rateMax: 10,
          minRateDescription: '(Most unlikely)',
          maxRateDescription: '(Most likely)',
        },
        {
          type: 'checkbox',
          name: 'promoter_features',
          visibleIf: '{nps_score} >= 9',
          title: 'What features do you value the most?',
          isRequired: true,
          validators: [
            {
              type: 'answercount',
              text: 'Please select two features maximum.',
              maxCount: 2,
            },
          ],
          hasOther: true,
          choices: [
            'Performance',
            'Stability',
            'User Interface',
            'Complete Functionality',
          ],
          otherText: 'Other feature:',
          colCount: 2,
        },
        {
          type: 'comment',
          name: 'passive_experience',
          visibleIf: '{nps_score} > 6  and {nps_score} < 9',
          title: 'What is the primary reason for your score?',
        },
        {
          type: 'comment',
          name: 'disappointed_experience',
          visibleIf: '{nps_score} notempty',
          title:
            'What do you miss and what was disappointing in your experience with us?',
        },
      ],
    },
  ],
  showQuestionNumbers: 'off',
};

const model = new Model(json);

export default function ExampleSurvey() {
  const onComplete = (survey: any, options: any) => {
    console.log('Survey results: ' + JSON.stringify(survey.data));
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Header title="Survey example" />
      <Card className={classes.root}>
        <Typography className={classes.title} variant="h5" component="h2">
          Example survey
        </Typography>
        <Survey model={model} onComplete={onComplete} />
      </Card>
    </React.Fragment>
  );
}
