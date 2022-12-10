import Head from 'next/head'
import styles from '../styles/PageLayout.module.css'

export default function PageLayout(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Markdown Diff Creator</title>
        <meta name="description" content="Create a markdown diff file for two input files." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {props.children}
      </main>
    </div>
  )
}