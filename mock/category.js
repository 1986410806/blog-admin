export default {
  'GET /admin/v1/category/list': {
    errorCode: 0,
    message: '',
    data: {
      page: {
        page: 1,
        limit: 10,
        total: 8,
      },
      results: [
        {
          created_at: '2019-11-29T11:30:05+08:00',
          description: '技术类文章',
          id: 1,
          name: '技术文章',
          updated_at: '2019-11-29T11:30:10+08:00',
        },
        {
          created_at: '2019-12-10T22:50:12+08:00',
          description: '测试更新',
          id: 2,
          name: 'test111111',
          updated_at: '2019-12-10T22:54:06+08:00',
        },
        {
          created_at: '2019-12-10T23:00:07+08:00',
          description: '测试更新',
          id: 7,
          name: 'test2019-12-10 23:00:07',
          updated_at: '2019-12-10T23:00:08+08:00',
        },
        {
          created_at: '2019-12-10T23:01:57+08:00',
          description: '测试更新',
          id: 8,
          name: 'test2019-12-10 23:01:57',
          updated_at: '2019-12-10T23:01:57+08:00',
        },
        {
          created_at: '2019-12-10T23:04:55+08:00',
          description: '测试更新',
          id: 9,
          name: 'test2019-12-10 23:04:54',
          updated_at: '2019-12-10T23:04:55+08:00',
        },
        {
          created_at: '2019-12-10T23:06:24+08:00',
          description: '测试更新',
          id: 10,
          name: 'test2019-12-10 23:06:23',
          updated_at: '2019-12-10T23:06:24+08:00',
        },
        {
          created_at: '2019-12-11T00:05:57+08:00',
          description: '测试更新',
          id: 11,
          name: 'test2019-12-11 00:05:57',
          updated_at: '2019-12-11T00:05:57+08:00',
        },
        {
          created_at: '2019-12-11T00:10:33+08:00',
          description: '测试更新',
          id: 12,
          name: 'test2019-12-11 00:10:33',
          updated_at: '2019-12-11T00:10:34+08:00',
        },
      ],
    },
    success: true,
  },
};
