import { reactive } from 'vue'

export default{
  data(){
    return {
      user:reactive(JSON.parse(sessionStorage.getItem('user')) || {}),

      testUser: {
        userName: 'Alice123',
        userNickName: 'Alice',
        userImg: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        userGender: 1,
        userPhone: '',
        userEmail: '',
        userSocialAccount: '',
        userSign: ''
      }
    }
  }
  
}
export const serverUrl = 'http://localhost:8086'
export const state_text = [
  '销售中',
  '已售罄',
  '已下架',
]
export const pay_methods = [
  '线上支付',
  '线下支付'
]
export const state_color = [
  'primary',
  'warning',
  'danger'
]
export const first_type = [
  '教材教辅',
  '文具用品',
  '宿舍生活',
  '服装服饰',
  '运动健身',
  '电子数码',
  '乐器',
  '兴趣爱好',
  '二次元',
  '毕业生专区',
  '新生专区'
]
export const user_menu_name = [
  'userDetail',
  'editDetail',
  'userFollowed',
  'fans',
  'published',
  'bought',
  'sold',
  'favourite',
  'add',
  'security'
]
export function throttle(func, limit)
{
  let lasttime = 0
  return function(...args){
    const nowtime = new Date().getTime()
    if(nowtime - lasttime >= limit)
    {
      lasttime = nowtime
      func.apply(this,args)
    }
  }
}