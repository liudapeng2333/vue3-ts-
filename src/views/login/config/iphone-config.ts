export const rules = {
  number: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      pattern: /^1[0-9]{10}$/,
      message: '手机号码格式不对',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9a-zA-Z]{4}$/,
      message: '验证码格式不对',
      trigger: 'blur'
    }
  ]
}
