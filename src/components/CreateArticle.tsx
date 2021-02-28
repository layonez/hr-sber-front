import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { v4 as uuidv4 } from 'uuid';
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

const CreateArticle: React.FC<Props> = observer(() => {
  const classes = useStyles();
  const { feed, templates } = useMst();

  const [title, setTitle] = React.useState('');
  const [selectedTemplate, setSelectedTemplate] = React.useState('');
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

        placeholder: 'Что расскажем?',
      })
    );
  }, []);

  const onCreateArticle = () => {
    editor
      ?.save()
      .then((outputData) => {
        feed.addPost({
          id: uuidv4(),
          type: 'article',
          title: title,
          content: JSON.stringify(outputData),
          cutContent: outputData.blocks
            ?.map((block) => block.data.text)
            .join('\n'),
          date: new Date(),
          image: 'https://source.unsplash.com/random',
          tags: [{ name: 'some' }, { name: 'stuff' }],
        });
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  };

  const onCreateTemplate = () => {
    editor
      ?.save()
      .then((outputData) => {
        templates.addTemplate({
          id: uuidv4(),
          type: 'article',
          name: title,
          data: JSON.stringify(outputData),
        });
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  };

  const handleSelectTemplate = (e: any) => {
    setSelectedTemplate(e.target.value);

    const data = templates.templates.find(
      (template) => template.id === e.target.value
    )?.data;
    editor?.render(JSON.parse(data || ''));
  };

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Typography variant="h3" color="primary">
          Создание статьи
        </Typography>
        <TextField
          className={classes.select}
          label="Заголовок статьи/шаблона"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.select}
          id="standard-select-currency"
          select
          label="Выбрать шаблон"
          fullWidth
          value={selectedTemplate}
          onChange={handleSelectTemplate}
        >
          {templates.templates.map((template) => (
            <MenuItem key={template.id} value={template.id}>
              {template.name}
            </MenuItem>
          ))}
        </TextField>
        <div id="editorjs"></div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onCreateArticle}
        >
          Создать статью
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={onCreateTemplate}
        >
          Создать шаблон
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          component={Link}
          to="/"
        >
          <ArrowBackIcon />
        </Button>
      </Container>
    </React.Fragment>
  );
});

export default CreateArticle;
