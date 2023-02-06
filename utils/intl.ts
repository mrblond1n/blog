const PLACEHOLDERS = {
  TEXT: /\$\$(\w+)\$\$/g,
}

export const textVars = (item: string, values: {[index: string]: string}): string =>
  item.replace(PLACEHOLDERS.TEXT, (_, index) => {
    const value = values[index]

    if (value === void 0) {
      return ''
    }

    return value
  })

export const intl = (item: unknown, values: {[index: string]: string} = {}): string =>
  typeof item === 'string' ? textVars(item, values) : ''
