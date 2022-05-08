import axios from 'axios'

// axios
//   .get('http://123.207.32.32:8000/home/multidata', {
//     params: {
//       name: 'Liu KunPeng'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000

axios
  .all([
    axios.get('/get', { params: { name: 'Liu KunPeng' } }),
    axios.post('/post', { params: { name: 'LLL' } })
  ])
  .then((res) => {
    console.log(res[1].data)
    console.log(res[0].data)
  })
