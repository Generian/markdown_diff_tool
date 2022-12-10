import { ChangeEvent } from "react"

export const readMarkdownFile = (event: ChangeEvent<HTMLInputElement>) => {
  const fileList = event?.target?.files
  const fr = new FileReader()
  fr.onload = () => {
    if (typeof(fr.result) === 'string') {
      return fr.result
    }
  }
  
  if (fileList) {
    fr.readAsText(fileList[0])
  }
}