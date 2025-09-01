import { mount } from '@vue/test-utils'
import UserRegisCom from '@/components/User/UserRegisCom.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
test('renders Regis com', () => {
  // 布置：获取注册表单，提交按钮，取消按钮
  const wrapper = mount(UserRegisCom,{
    global: {
      plugins: [ElementPlus]
    }
  })
  const regis = wrapper.get('[data-test="regisForm"]')
  // 执行

  // 断言
  expect(regis.findAll('input')).toHaveLength(4)
})
test('regis a new user', async () => {
  // 布置：获取注册表单，提交按钮，取消按钮
  const wrapper = mount(UserRegisCom,{
    global: {
      plugins: [ElementPlus]
    }
  })
  const form = wrapper.get('[data-test="regisForm"]')
  const inputs = form.findAll('input')
  // 执行
  await inputs[0].setValue('Alice')
  // 断言
  expect(inputs[0].element.value).toBe("Alice")
})