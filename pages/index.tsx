import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'
import { download, getDiffMarkdown } from '../helpers/diff'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [oldString, setOldString] = useState('')
  const [newString, setNewString] = useState('')
  const [diff, setDiff] = useState('')

  const readMdFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event?.target?.files
    const fr = new FileReader()
    fr.onload = () => {
      if (typeof(fr.result) === 'string') {
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
      console.log(diff)
    }
  }, [oldString, newString])

  return (
    <div className={styles.container}>
      <Head>
        <title>Markdown Diff Creator</title>
        <meta name="description" content="Create a markdown diff file for two input files." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.input}>
          <input type="file" id="old" onChange={readMdFile} accept=".md"/>
          <input type="file" id="new" onChange={readMdFile} accept=".md"/>
        </div>
        <div className={styles.download}>
          <button 
            onClick={() => download('diff.md', diff)}
            disabled={!diff}
          >
            Download
          </button>
        </div>
        <div className={styles.divContainer}>
          {diff}
        </div>
      </main>
    </div>
  )
}
