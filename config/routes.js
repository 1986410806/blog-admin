export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
      },
    ],
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'icon-shuju1',
    routes: [
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    path: '/users',
    icon: 'UsergroupAdd',
    name: 'user-list',
    component: './user/list',
  },
  {
    path: '/article',
    icon: 'icon-shu',
    name: 'article',
    routes: [
      {
        path: '/article/list',
        name: 'list',
        component: './article/list',
      },
      {
        path: '/article/form',
        name: 'form',
        component: './article/form',
      },
      {
        name: 'tags',
        icon: 'TagsOutlined',
        path: 'article/tag',
        component: './tag',
      },
      {
        name: 'category',
        icon: 'MenuOutlined',
        path: '/article/category',
        component: './category',
      },
      { // 编辑
        path: '/article/edit/:id',
        component: './article/form',
      },
    ],
  },
  {
    name: 'result',
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
      {
        name: 'success',
        icon: 'smile',
        path: '/result/success',
        component: './result/success',
      },
      {
        name: 'fail',
        icon: 'smile',
        path: '/result/fail',
        component: './result/fail',
      },
    ],
  },
  // {
  //   name: 'message',
  //   icon: 'message',
  //   path: '/result',
  //   routes: [
  //     {
  //       name: 'success',
  //       icon: 'smile',
  //       path: '/result/success',
  //       component: './result/success',
  //     },
  //   ]
  // },
  {
    path: '/project',
    name: 'project',
    icon: 'ProjectOutlined',
    component: './project',
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },

  {
    path: '/',
    redirect: '/dashboard/analysis',
  },
  {
    component: '404',
  },
];
