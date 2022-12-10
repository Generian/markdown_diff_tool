import { useCallback, useMemo, useState } from 'react'
import styles from '../styles/Editor.module.css'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import PageLayout from '../components/PageLayout'
import { Button, Checkbox, FormControlLabel, FormGroup, Paper, Typography } from '@mui/material'
import { marked } from 'marked'
import { version1 } from '../helpers/data'
import { download, getDiffMarkdown } from '../helpers/diff'

export default function Home() {
  const [content, setContent] = useState(version1)
  const [versions, setVersions] = useState([version1])
  const [highlightDiff, setHighlightDiff] = useState(true)

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as EasyMDE.Options;
  }, [])

  const getContentToRender = () => {
    if (highlightDiff) {
      return getDiffMarkdown(versions[versions.length - 1], content)
    }
    return content
  }

  const onEditorChange = useCallback((value: string) => {
    setContent(value)
  }, [])

  const handleDiffCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHighlightDiff(event.target.checked);
  }

  const handlePublishVersion = () => {
    setVersions([...versions, content])
  }

  const downloadDiff = () => download('diff.md', getDiffMarkdown(versions[versions.length - 1], content))

  const downloadPdf = async () => {
    // @ts-ignore
    const html2pdf = (await import('html-to-pdf-js')).default
    var element = document.getElementById('content')
    window && html2pdf(element)
  }

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.containerRow}>
          <div className={styles.halves}>
            <Typography>{`Current version: ${versions.length}`}</Typography>
            <Button
              variant="contained"
              onClick={handlePublishVersion}
            >
              Publish Version
            </Button>
          </div>
          <div className={styles.halves}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox
                  checked={highlightDiff}
                  inputProps={{ 'aria-label': 'controlled' }}
                  onChange={handleDiffCheckboxChange}
                />}
                label="Highlight diff to last version"
              />
            </FormGroup>
            <Button
              variant="contained"
              onClick={downloadDiff}
            >
              Download Diff
            </Button>
            <Button
              variant="contained"
              onClick={downloadPdf}
            >
              Download PDF
            </Button>
          </div>
        </div>
        <div className={styles.containerRow}>
          <div className={styles.halves}>
            <SimpleMDE
              className={styles.editor}
              value={content}
              options={options}
              onChange={onEditorChange}
            />
          </div>
          <div className={styles.halves}>
            {content && <Paper
              elevation={1}
            >
              <div
                id='content'
                className={styles.textFormatting}
                dangerouslySetInnerHTML={{ __html: marked.parse(getContentToRender()) }}>

              </div>
            </Paper>}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
