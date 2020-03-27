import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import h from 'react-hyperscript'

import Footer from '../component/layout/Footer'
import BgImgData from '../assets/img/LoginBackground.jpg'
import MyRequest from '../https/MyRequest'
import History from '../common/History'
import Store from '../store/Store'
import { setAccountInfo }  from '../store/Action'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    /* 显示本地图片 */
    backgroundImage: `url('${BgImgData}')`,
    /* 显示网络图片
    backgroundImage: 'url(https://source.unsplash.com/random)',
    */
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//错误提示部分封装不够，需要重写
export default function Login() {

  let account = ""
  let password = ""

  async function loginCallback() {

    //利用数组构建data
    //data的参数名与后端严格一致
    let data = {};
    data.accountName = account
    data.password = password

    try {
      const response = await MyRequest.login(data)

      if (response === undefined) {
        //弹出错误提示信息
        let id = Math.random()
        global.$addMySnackbar({
            autoHideDuration: 3000,
            message: '出错啦',
            action: [
                h(Button, {
                    key: 'any',
                    color: 'secondary',
                    onClick: () => {
                        global.$closeMySnackBar(id)
                    }
                }, '关闭')
            ],
        }, id)
      } else if (response.data.code !== '000000') {
        //弹出错误提示信息
        let id = Math.random()
        global.$addMySnackbar({
            autoHideDuration: 3000,
            message: response.data.msg,
            action: [
                h(Button, {
                    key: 'any',
                    color: 'secondary',
                    onClick: () => {
                        global.$closeMySnackBar(id)
                    }
                }, '关闭')
            ],
        }, id)
      } else {
        //登录成功，存储账户基础信息，跳到主页
        /*
        console.log("initial state: ", store.getState());
        let unsubscribe = store.subscribe(() =>
          console.log(store.getState())
        );
        */
        Store.dispatch(setAccountInfo(response.data.data));
        //unsubscribe();

        let id = Math.random()
        global.$addMySnackbar({
            autoHideDuration: 3000,
            message: "登录成功",
            action: [
                h(Button, {
                    key: 'any',
                    color: 'secondary',
                    onClick: () => {
                        global.$closeMySnackBar(id)
                    }
                }, '关闭')
            ],
        }, id)
        History.push('/home')
      }
    } catch (e) {
      console.log(e)
    }
  }

  function handleAccountChange (e) {
    //前端规则校验暂时忽略
    account = e.target.value
  }

  function handlePasswordChange (e) {
    //前端规则校验暂时忽略
    password = e.target.value
  }

  const classes = useStyles()
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登录
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              name="account"
              onChange={handleAccountChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="密码"
              name="password"
              type="password"
              onChange={handlePasswordChange}
            />
            {/*
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="记住账号"
            />
            */}
            <Button
              type="button" // 不指定button属性，按钮点击后页面会自动刷新
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={loginCallback}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码 ?（待开发）
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  注册
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Footer />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}