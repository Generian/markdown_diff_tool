import { markdownDiff } from 'markdown-diff'

export const getDiffMarkdown = (oldString: string, newString: string) => {
  const diff = markdownDiff(oldString, newString)
  return diff
}

export const download = (filename: string, text: string) => {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
