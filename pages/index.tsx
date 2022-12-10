import PageLayout from '../components/PageLayout'
import { useEffect } from 'react'
import router from 'next/router'

export default function Home() {
  useEffect(() => {
    router.push('/editor')
  }, [])
  return (
    <PageLayout>

    </PageLayout>
  )
}
