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
    path: '/project',
    name: 'project',
    icon: 'ProjectOutlined',
    component: './project',
  },
  {
    path: '/',
    redirect: '/article/list',
  },
  {
    component: '404',
  },
];
