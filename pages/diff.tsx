import { marked } from 'marked'
import { ChangeEvent, useEffect, useState } from 'react'
import { download, getDiffMarkdown } from '../helpers/diff'
import styles from '../styles/Diff.module.css'
import { Button, Paper, Typography } from '@mui/material'
import PageLayout from '../components/PageLayout'

export default function Diff() {
  const [oldString, setOldString] = useState('')
  const [newString, setNewString] = useState('')
  const [diff, setDiff] = useState('')

  const readMdFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event?.target?.files
    const fr = new FileReader()
    fr.onload = () => {
      if (typeof (fr.result) === 'string') {
        if (event.target.id === 'old') {
          fr.result && setOldString(fr.result)
        } else {
          setNewString(fr.result)
        }
      }
    }

    if (fileList) {
      fr.readAsText(fileList[0])
    }
  }

  useEffect(() => {
    if (oldString && newString) {
      setDiff(getDiffMarkdown(oldString, newString))
    }
  }, [oldString, newString])

  return (
    <PageLayout>
      <div className={styles.contentContainer}>
        <div className={styles.controls}>
          <div className={styles.input}>
            <Typography>File 1</Typography>
            <input type="file" id="old" onChange={readMdFile} accept=".md" />
            <Typography>File 2</Typography>
            <input type="file" id="new" onChange={readMdFile} accept=".md" />
          </div>
          <div className={styles.download}>
            <Button
              onClick={() => download('diff.md', diff)}
              disabled={!diff}
            >
              Download
            </Button>
            <Button
              onClick={
                async () => {
                  // @ts-ignore
                  const html2pdf = (await import('html-to-pdf-js')).default
                  var element = document.getElementById('content')
                  window && html2pdf(element)
                }
              }
            >
              Download pdf
            </Button>
          </div>
        </div>
        <div className={styles.divContainer}>
          <Paper
            id='content'
            elevation={6}
            className={styles.textFormatting}
            dangerouslySetInnerHTML={{ __html: marked.parse(diff) }}
          >
          </Paper>
        </div>
      </div>
    </PageLayout>
  )
}
