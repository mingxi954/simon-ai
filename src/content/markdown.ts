function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function inline(value: string) {
  return escapeHtml(value).replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2">$1</a>',
  )
}

export function renderMarkdown(source: string) {
  const blocks = source.trim().split(/\n{2,}/)
  return blocks
    .map((block) => {
      const lines = block.split('\n')
      if (lines.every((line) => line.startsWith('## '))) {
        return lines.map((line) => `<h2>${inline(line.slice(3))}</h2>`).join('')
      }
      if (lines.every((line) => line.startsWith('- '))) {
        const items = lines.map((line) => `<li>${inline(line.slice(2))}</li>`).join('')
        return `<ul>${items}</ul>`
      }
      return `<p>${lines.map((line) => inline(line)).join('<br />')}</p>`
    })
    .join('')
}
