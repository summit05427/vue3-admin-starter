export default {
  routes: {
    home: '首页',
    login: '登录',
    forbidden: '无访问权限',
    notFound: '页面不存在',
  },
  layout: {
    expandSidebar: '展开侧边栏',
    collapseSidebar: '收起侧边栏',
    openNav: '打开导航',
    closeNav: '关闭导航',
    breadcrumb: '面包屑',
    login: '登录',
    account: '账户',
    logout: '退出登录',
  },
  theme: {
    switch: '切换主题',
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
    current: '当前',
  },
  locale: {
    switch: '切换语言',
    zhCN: '简体中文',
    enUS: 'English',
  },
  login: {
    title: '登录',
    description: '使用你的账号继续',
    username: '用户名',
    usernamePlaceholder: '请输入用户名',
    password: '密码',
    passwordPlaceholder: '请输入密码',
    submit: '登录',
    submitting: '登录中...',
    required: '请填写用户名和密码',
  },
  error: {
    forbidden: {
      title: '403',
      description: '当前账号没有访问该页面的权限。',
      backHome: '返回首页',
    },
    notFound: {
      title: '404',
      description: '页面不存在或已被移除，请检查地址是否正确。',
      backHome: '返回首页',
    },
  },
}
