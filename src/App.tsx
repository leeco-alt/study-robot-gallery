// 这个是函数组件，比较推荐的写法

import React, { useState, useEffect } from 'react'
import logo from './assets/icons/logo.svg'
import robots from './mockdata/robots.json'
import Robot from './components/Robot'
import RobotDiscount from './components/RobotDiscount'
import styles from './App.module.css'
import ShoppingCard from './components/ShoppingCart'

// const html = "<img onerror='alert(\"Hacked!\") src='invalid-image' />"
// const jsHacked = "javascript: alert('Hacked!');"

interface Props {}

interface State {
  robotGallery: any[]
  count: number
}

const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `点击次数${count}次`
  }, [count])

  // 如果第二个参数，为空数组，则会模拟 componentDidMount 只在挂载后执行一次
  // 如果不加第二个参数，它会在每次页面更新后都会执行一次，可以会造成无限循环
  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        // .then((response) => response.json())
        // .then((data) => setRobotGallery(data))
        const data = await response.json()
        setRobotGallery(data)
      } catch (e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    fetchDate()
  }, [])

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
          setCount(count + 1)
        }}
      >
        click
      </button>
      <span>count: {count}</span>
      <ShoppingCard />
      {(error || error === '') && <div>网站出错：{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) =>
            index % 2 === 0 ? (
              <RobotDiscount id={r.id} email={r.email} name={r.name} />
            ) : (
              <Robot id={r.id} email={r.email} name={r.name} />
            )
          )}
        </div>
      ) : (
        <h2>loading ...</h2>
      )}
    </div>
  )
}

export default App
