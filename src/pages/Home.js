import React from 'react'
import { Component } from 'react'
import h from 'react-hyperscript'

import { connect } from 'react-redux'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import Footer from '../component/layout/Footer'
import History from '../common/History'
import Store from '../store/Store'
import { delAccountInfo }  from '../store/Action'

class Home extends Component {

  componentDidMount() {
    //如果用户未登录，直接跳转至登录页面
    //console.log(this.props.accountInfo)
    if (this.props.accountInfo.uid === 0) {
      History.push('/login')
    }
  }

  logoutCallback() {
    //清除客户端信息
    Store.dispatch(delAccountInfo());

    //ToDo:在服务端注销对应的token

    //提示已退出成功，跳转至login页面
    let id = Math.random()
    global.$addMySnackbar({
        autoHideDuration: 3000,
        message: '账号已退出',
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
    History.push('/login')
  }

  render() {
    return ( 
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            CTO之瞳主页
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            用户名：{this.props.accountInfo.accountName} <br />
            注册时间：{this.props.accountInfo.regTime.substring(0,10)} <br />
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.logoutCallback}
          >
            退出
          </Button>
          <Footer />
        </Box>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    accountInfo: state.accountReducer.accountInfo,
  }
}

export default connect(mapStateToProps)(Home)