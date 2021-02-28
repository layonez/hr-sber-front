import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ShareIcon from '@material-ui/icons/Share';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { observer } from 'mobx-react-lite';

import EditorJS from '@editorjs/editorjs';
import EditorHeader from '@editorjs/header';
import EditorList from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import LinkTool from '@editorjs/link';
import InlineCode from '@editorjs/inline-code';

import { useMst } from '../models/Root';

const useStyles = makeStyles({
  root: {
    marginTop: '16px',
  },
  select: { marginBottom: '16px' },
  button: {
    marginLeft: '8px',
    marginRight: '8px',
  },
});

interface Props {}

const ShowArticle: React.FC<Props> = observer(() => {
  const classes = useStyles();
  const { feed } = useMst();
  const { id } = useParams<{ id: string }>();
  const article = feed.posts.find((post) => post.id === id);
  const [editor, setEditor] = React.useState<EditorJS | null>(null);

  React.useEffect(() => {
    setEditor(
      new EditorJS({
        holder: 'editorjs',

        tools: {
          header: EditorHeader,
          list: EditorList,
          image: SimpleImage,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
              },
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          linkTood: LinkTool,
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
        },

        data: JSON.parse(article?.content || ''),
        placeholder: 'Пусто',
        readOnly: true,
        minHeight: 0,
      })
    );
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h3" color="primary">
        {article?.title}
      </Typography>
      <Container className={classes.root}>
        <div id="editorjs"></div>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>
            <ThumbUpIcon />
          </Button>
          <Button>
            <ThumbDownIcon />
          </Button>
          <Button>
            <ShareIcon />
          </Button>
          <Button>
            <PriorityHighIcon />
          </Button>
          <Button>
            <InsertCommentIcon />
          </Button>
          <Button component={Link} to="/">
            <ArrowBackIcon />
          </Button>
        </ButtonGroup>
      </Container>
    </React.Fragment>
  );
});

export default ShowArticle;
