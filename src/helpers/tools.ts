export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined') {
    return false
  }

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    textArea.setSelectionRange(0, text.length)

    const isCopied = document.execCommand('copy')
    document.body.removeChild(textArea)

    return isCopied
  }
}
