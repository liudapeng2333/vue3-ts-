import { useStore } from '@/store'

export function userPermission(pageName: string, handleName: string) {
  const stroe = useStore()
  const permission = stroe.state.accountLogin.permissions

  const btnPermission = `system:${pageName}:${handleName}`

  return !!permission.find((item) => item === btnPermission)
}
