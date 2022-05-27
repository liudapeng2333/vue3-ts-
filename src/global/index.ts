import { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import registerProperties from './register-properties'

export function registerElementZhCn(app: App) {
  app.use(ElementPlus, {
    locale: zhCn
  })
  app.use(registerProperties)
}
