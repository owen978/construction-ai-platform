/**
 * Turn a plain-text template (lines, ALL-CAPS headings and Markdown tables)
 * into an HTML document Word opens as an editable .doc. No dependencies:
 * Word reads this HTML flavour natively.
 */

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** **bold** → <b>, keeping everything else literal. */
const inline = (s: string) => escape(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')

const isTableRow = (l: string) => /^\s*\|.*\|\s*$/.test(l)
const isDivider = (l: string) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l)
const cells = (l: string) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim())

function isHeading(line: string) {
  const t = line.trim()
  if (/^#{1,4}\s/.test(t)) return true
  // Short lines in capitals ("PART A: RISK ASSESSMENT") are section headings.
  const letters = t.replace(/[^A-Za-z]/g, '')
  return letters.length >= 4 && t.length <= 80 && letters === letters.toUpperCase() && !t.includes('[')
}

export function templateToWordHtml(title: string, content: string, footer: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let first = true
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (isTableRow(line)) {
      const rows: string[][] = []
      let header: string[] | null = null
      while (i < lines.length && isTableRow(lines[i])) {
        if (isDivider(lines[i])) {
          if (rows.length === 1 && !header) header = rows.pop()!
        } else rows.push(cells(lines[i]))
        i++
      }
      i--
      const head = header ? `<tr>${header.map((c) => `<th>${inline(c)}</th>`).join('')}</tr>` : ''
      const body = rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')
      out.push(`<table>${head}${body}</table>`)
      continue
    }
    const t = line.trim()
    if (!t) continue
    if (isHeading(t)) {
      const text = t.replace(/^#{1,4}\s*/, '')
      out.push(first ? `<h1>${inline(text)}</h1>` : `<h2>${inline(text)}</h2>`)
    } else if (/^[-*•]\s+/.test(t)) {
      out.push(`<p class="li">&bull;&nbsp;${inline(t.replace(/^[-*•]\s+/, ''))}</p>`)
    } else {
      out.push(`<p>${inline(t)}</p>`)
    }
    first = false
  }

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${escape(title)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
@page { size: 21cm 29.7cm; margin: 2cm; }
body { font-family: Arial, sans-serif; font-size: 10pt; color: #1e293b; }
h1 { font-size: 16pt; margin: 0 0 10pt; }
h2 { font-size: 12pt; margin: 14pt 0 6pt; }
p { margin: 0 0 5pt; }
p.li { margin-left: 12pt; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt; }
th, td { border: 1px solid #94a3b8; padding: 4pt 5pt; vertical-align: top; font-size: 9pt; }
th { background: #e2e8f0; text-align: left; }
.footer { margin-top: 18pt; font-size: 8pt; color: #64748b; }
</style></head>
<body>
${out.join('\n')}
<p class="footer">${escape(footer)}</p>
</body></html>`
}
