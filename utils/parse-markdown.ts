export const parse_markdown = (markdown: string): string => {
  return markdown
    .replace(/^(#{1,6})\s*(.+)$/gm, (_, { length }, content) => `<h${length}>${content}</h${length}>`)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/\~(.+?)\~/g, '<s>$1</s>')
    .replace(/```([^`]+)```/g, (_, p1) => `<pre id="code-extended">${p1.replace(/^\n/g, '')}</pre>`)
    .replace(/`([^`]+)`/g, (_, p1) => `<code id="code-simple">${p1.replace(/^\n/g, '')}</code>`)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]*)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^(?:-\s*(.+))$/gm, '<li id="not-ordernated-list">$1</li>')
    .replace(/^((\d+)\.\s*(.+))$/gm, '<li id="ordernated-list">$1</li>')
    .replace(/\n/g, '<br />')
}
