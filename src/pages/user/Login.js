import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    // console.log('values :', values)
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/loginAdmin',
        // type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            {/* <UserName name="userName" placeholder="admin/user" /> */}
            <UserName name="email" placeholder="admin/user" />
            <Password
              name="password"
              placeholder="888888/123456"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          {/* <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <UserName name="userName" placeholder="admin/user" />
            <Password
              name="password"
              placeholder="888888/123456"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            /> 
          </Tab> */}
          {/* <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !submitting &&
              this.renderMessage('验证码错误')}
            <Mobile name="mobile" />
            <Captcha name="captcha" countDown={120} onGetCaptcha={this.onGetCaptcha} />
          </Tab> */}
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            {/* <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a> */}
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          {/* <div className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/User/Register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div> */}
        </Login>
      </div>
    );
  }
}

export default LoginPage;
