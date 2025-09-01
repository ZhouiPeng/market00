// 测试代码
export const users= [
{
  userId: 1,
  username: 'Alice',
  picture: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  picture_narrow: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  tel: '132',
  email: '1@qq.com',
  gender: 2,
  prof: 'Here is Alice',
  fans: 1,
  follows: 1000
},
{
  userId: 2,
  username: 'Bob',
  picture: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  picture_narrow: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  tel: '134',
  email: '2@qq.com',
  gender: 1,
  prof: 'Here is Bob',
  fans: 1,
  follows: 1000
}
]
export const products1 = []
for(let i = 0; i < 100; i++)
{
  const product = {
    id: undefined,
    name: null,
    price: undefined,
    amount: undefined,
    state: undefined,
    want: undefined,
    userId: undefined,
    pics: ['https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png']
  }
  product.id = i
  product.name = 'item' + i
  product.price = i + 0.01
  product.amount = i + 1
  product.state = i % 3
  product.want = i
  product.userId = 1
  products1.push(product)
}
export const products2= []
for(let i = 0; i < 100; i++)
{
  const product = {
    id: undefined,
    name: null,
    price: undefined,
    amount: undefined,
    state: undefined,
    want: undefined,
    userId: undefined,
    pics: ['https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png']
  }
  product.id = i + products1.length
  product.name = 'product' + i
  product.price = i + 0.01
  product.amount = i + 1
  product.state = i % 3
  product.want = i
  product.userId = 2
  products2.push(product)
}
export const allProducts = products1.concat(products2)