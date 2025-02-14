import type { Dispatch, SetStateAction, MouseEvent } from 'react'

const markdown_format: Record<string, (text: string) => string> = {
  bold: (text) => `**${text}**`,
  strikethrough: (text) => `~${text}~`,
  italic: (text) => `*${text}*`,
  code: (text) => `\`${text}\``,
  list: (text) => `\n- ${text}\n`,
  image: () => `![Example](https://example.com)`,
  link: () => `[Example](https://example.com)`,
};

export const change_text_type = ([hook, set_hook]: [string, Dispatch<SetStateAction<string>>], { currentTarget }: MouseEvent<HTMLButtonElement>): void => {
  const { selectionStart = 0, selectionEnd = 0 } = (document.getElementById('input') as HTMLTextAreaElement)

  const [start, select, end] = [
    hook.substring(0, selectionStart),
    hook.substring(selectionStart, selectionEnd),
    hook.substring(selectionEnd)
  ]

  if (currentTarget.id !== 'size')
    set_hook(`${start}${markdown_format[currentTarget.id](select)}${end}`)
  else if (select.startsWith('#'))
    set_hook(`${start}${select.replace('#', '##')}${end}`)
  else if (select.startsWith('##'))
    set_hook(`${start}${select.replace('##', '###')}${end}`)
  else set_hook(`${start}\n# ${select}${end}`)
}
