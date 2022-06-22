import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  const routesFile = require.context('../router/main', true, /\.ts/)

  routesFile.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  const _recurseGetroute = (userMenus: any[]) => {
    for (const userMenu of userMenus) {
      if (userMenu.type === 2) {
        const route = allRoutes.find((route) => route.path === userMenu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = userMenu
        }
      } else if (userMenu.type === 1) {
        _recurseGetroute(userMenu.children)
      }
    }
  }
  _recurseGetroute(userMenus)

  return routes
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const userMenu of userMenus) {
    if (userMenu.type === 1) {
      const findMenu = pathMapToMenu(
        userMenu.children ?? [],
        currentPath,
        breadcrumbs
      )
      if (findMenu) {
        breadcrumbs?.push({ name: userMenu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (userMenu.type === 2 && userMenu.url === currentPath) {
      return userMenu
    }
  }
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function mapMenusToMenus(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermissions = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2)
        _recurseGetPermissions(menu.children ?? [])
      else if (menu.type === 3) permissions.push(menu.permission)
    }
  }
  _recurseGetPermissions(userMenus)
  return permissions
}

export function menuMapstoLeafKeys(menus: any[]) {
  const leafKeys: number[] = []

  const _recurGetLeafKeys = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children) {
        _recurGetLeafKeys(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurGetLeafKeys(menus)

  return leafKeys
}
