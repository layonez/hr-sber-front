import React from 'react';
import ReactMarkdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
}));

const LiComponent: React.FC = (props) => {
  const classes = useStyles();

  return (
    <li className={classes.listItem}>
      <Typography component='span' {...props} />
    </li>
  );
};

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: LiComponent,
    },
  },
};

export default function Markdown(
  props: JSX.IntrinsicAttributes & {
    [key: string]: any;
    children: string;
    options?:
      | Partial<{
          createElement: (
            tag:
              | string
              | React.FunctionComponent<{}>
              | React.ComponentClass<{}, any>,
            props: React.Props<any>,
            ...children: React.ReactChild[]
          ) => JSX.Element;
          disableParsingRawHTML: boolean;
          forceBlock: boolean;
          forceInline: boolean;
          namedCodesToUnicode: { [key: string]: string };
          overrides: MarkdownToJSX.Overrides;
          wrapper: React.ElementType<any>;
          forceWrapper: boolean;
          slugify: (source: string) => string;
        }>
      | undefined;
  } & { children?: React.ReactNode }
) {
  return <ReactMarkdown options={options} {...props} />;
}
