// 这个是类组件，比较过时的写法

import React from 'react'
import logo from './assets/icons/logo.svg'
import robots from './mockdata/robots.json'
import Robot from './components/Robot'
import styles from './App.module.css'
import ShoppingCard from './components/ShoppingCart'

// const html = "<img onerror='alert(\"Hacked!\") src='invalid-image' />"
// const jsHacked = "javascript: alert('Hacked!');"

interface Props {}

interface State {
  robotGallery: any[]
  count: number
}

class App extends React.Component<Props, State> {
  // * 生命周期第一阶段：初始化
  // 初始化组件 state
  constructor(props) {
    super(props)
    this.state = {
      robotGallery: [],
      count: 0
    }
  }

  // 在组件创建好 dom 元素以后、挂载进页面的时候调用
  componentDidMount(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => this.setState({ robotGallery: data }))
  }

  // * 生命周期第二阶段：更新
  // 在组件接收一个新的 prop （更新后）时被调用
  // componentWillReceiveProps
  // static getDerivedStateFromProps(nextProps,prveState){}
  // 判断是否应该更新
  // shouldComponentUpdate(
  //   nextProps: Readonly<Props>,
  //   nextState: Readonly<State>,
  //   nextContext: any
  // ): boolean { return nextState.some !== this.state.some}
  // 组件更新后调用
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {}

  // * 生命周期第三阶段：销毁
  // 组件销毁后调用
  // 可以当做析构函数 destructor 来使用
  componentWillUnmount(): void {}

  render(): React.ReactNode {
    return (
      <div className={styles.app}>
        {/* <div>{html}</div> */}
        {/* <a href={jsHacked}>My wesite</a> */}
        <div className={styles.appHeader}>
          <img src={logo} alt="logo" className={styles.appLogo} />
          <h1>未来元宇宙区块链机器人online购物平台</h1>
        </div>
        <button
          onClick={() => {
            // 异步更新，同步执行
            this.setState(
              (preState, preProps) => {
                return {
                  count: preState.count + 1
                }
              },
              () => {
                console.log('count', this.state.count)
              }
            )
            this.setState(
              (preState, preProps) => {
                return {
                  count: preState.count + 1
                }
              },
              () => {
                console.log('count', this.state.count)
              }
            )
          }}
        >
          click
        </button>
        <span>count: {this.state.count}</span>
        <ShoppingCard />
        <div className={styles.robotList}>
          {this.state.robotGallery.map((r) => (
            <Robot id={r.id} email={r.email} name={r.name} />
          ))}
        </div>
      </div>
    )
  }
}

export default App
