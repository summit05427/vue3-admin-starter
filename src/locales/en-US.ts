const enUS = {
  routes: {
    home: 'Home',
    login: 'Sign in',
    forbidden: 'Access denied',
    notFound: 'Page not found',
  },
  layout: {
    expandSidebar: 'Expand sidebar',
    collapseSidebar: 'Collapse sidebar',
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    breadcrumb: 'Breadcrumb',
    login: 'Sign in',
    account: 'Account',
    logout: 'Sign out',
  },
  theme: {
    switch: 'Switch theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    current: 'Current',
  },
  locale: {
    switch: 'Switch language',
    zhCN: '简体中文',
    enUS: 'English',
  },
  login: {
    title: 'Sign in',
    description: 'Sign in with your account to continue',
    username: 'Username',
    usernamePlaceholder: 'Enter your username',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    submit: 'Sign in',
    submitting: 'Signing in...',
    required: 'Username and password are required',
  },
  error: {
    forbidden: {
      title: '403',
      description: 'Your account does not have permission to access this page.',
      backHome: 'Back to home',
    },
    notFound: {
      title: '404',
      description: 'The page does not exist or has been removed. Please check the URL.',
      backHome: 'Back to home',
    },
  },
} satisfies typeof import('./zh-CN').default

export default enUS
