const userInfo = {
  id: 1,
  avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1441588315,1666293982&fm=26&gp=0.jpg',
  created_at: '2019-11-14 16:37:26',
  description: '轻轻地我走了，正如我轻轻的来。',
  email: '',
  nickname: '管理员',
  roles: 'admin',
  status: 0,
  type: 0,
  updated_at: '2019-12-08 13:59:08',
  username: 'admin',
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    errorCode: 0,
    message: '',
    success: true,
    data: userInfo,
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '123456' && userName === 'admin') {
      res.send({
        errorCode: 0,
        message: '',
        success: true,
        data: {
          ref: type,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImV4cCI6MTU3NTgyMDc0OCwiaWF0IjoxNTc1Nzg0NzQ4LCJpZCI6MSwiaXNzIjoiYmxvZy1hZG1pbiIsImp0aSI6ImIwZGJkNDhkZmY1YjRlNzVhNGU3NjYxNzgwNTYyMzY4IiwicnVsZSI6IueuoeeQhuWRmCIsInVzZXJfbmFtZSI6ImFkbWluIn0.YZZjN5Qa9PE0rNYfQBbFDi0vvAIv4lmKlaf87QlUVto',
          user: userInfo,
        },
      })
      return;
    }

    res.send({
      errorCode: 0,
      message: '账号或密码错误',
      success: false,
    });
  },
  'POST /api/register':
    (req, res) => {
      res.send({
        status: 'ok',
        currentAuthority: 'user',
      });
    },
};
