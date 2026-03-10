export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined') {
    return false
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  const isCopied = document.execCommand('copy')
  document.body.removeChild(textArea)

  return isCopied
}
