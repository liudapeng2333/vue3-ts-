const getIcon = (icon: string) => {
  const icons = icon.split('-')
  const iconName = icons.slice(2).join('')
  return iconName
}

const icon = 'el-icon-chat-line-round'

console.log(getIcon(icon))
