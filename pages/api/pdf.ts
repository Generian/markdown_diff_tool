import markdownpdf from 'markdown-pdf'

const downloadPdfFile = async (content: string) => {
 const file = await markdownpdf()
  .from.string(content)
  .to("document.pdf", function () {
    console.log("Done")
  })
  return file
}

export default async function handle(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const result = await downloadPdfFile(content)
    res.json(result)
  }
}

export const getPdfFromString = async (
  content: string,
) => {
  try {
    let result = await fetch(`/api/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content
      })
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}