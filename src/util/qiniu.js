import { upload as  uploadConfig} from '/config/qiniu';
const qiniu = require('qiniu-js');

export const raundKey = () => {
  let timestamp = (new Date()).valueOf().toString();
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let res = '';
  for (var i = 0; i < 5; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return escape(timestamp + res);
};


export const upload = async (files, token, callback) => {
  const observable = qiniu.upload(files, raundKey() + '.jpg', token, {}, {});
  const subscription = observable.subscribe({
    next(res) {
      // ...
    },
    error(err) {
      message.error(err.message);
    },
    complete(res) {
      callback && callback(uploadConfig.baseUri + res.key);
    },
  }); // 上传开始

};
