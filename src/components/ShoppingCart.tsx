import React from 'react'
import styles from './ShoppingCart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { appContext } from '../AppState'

interface Props {}

interface State {
  isOpen: boolean
}

class ShoppingCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false
    }
    // 如果不适用箭头函数，就需要手动把 this 指向类的内存地址
    // this.handleClick = this.handleClick.bind(this)
  }

  // 箭头函数没有自己的 this，会永远指向定义自己的对像内存地址
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(this)
    // 点击到的那个元素
    console.log('事件发生的元素', e.target)
    // onclick 事件绑定在哪个元素，就是哪个元素
    console.log('事件处理绑定的元素', e.currentTarget)
    if ((e.target as HTMLElement).nodeName === 'SPAN') {
      this.setState({ isOpen: !this.state.isOpen })
    }
  }

  render(): React.ReactNode {
    return (
      <appContext.Consumer>
        {(value) => {
          return (
            <div className={styles.cartContainer}>
              <button className={styles.button} onClick={this.handleClick}>
                <FiShoppingCart />
                <span>购物车 {value.shoppingCart.items.length} (件)</span>
              </button>
              <div
                className={styles.cartDropDown}
                style={{
                  display: this.state.isOpen ? 'block' : 'none'
                }}
              >
                <ul>
                  {value.shoppingCart.items.map((i) => (
                    <li>{i.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </appContext.Consumer>
    )
  }
}

export default ShoppingCard
