const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function createStore(reducer){
  let state = null
  const listeners = [] // dispatch之后触发的函数
  const subscribe = (listener) => listeners.push(listener)
  const getState = ()=>state
  const dispatch = (action)=>{
    state = reducer(state,action)
    listeners.forEach(item =>item())
  }
  dispatch({}) // 初始化 state
  return {subscribe,getState,dispatch}
}

function reducer (state, action) {
  // 初始化state
  if (!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state // 没有修改，返回原来的对象
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}

// react-redux 把store放到Provider组件的context里面
// connect(传入的state,传入的action)返回一个函数，这个函数是高阶组件，参数是要包裹的组件
export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    render () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      let dispatchProps = mapDispatchToProps(store.dispatch, this.props)
      return <WrappedComponent {...stateProps} {...dispatchProps} />
    }
  }

  return Connect
}

// Provider将数据放入context，
// connect的时候会从context中取出store，获取mapStateToProps，mapDispatchToProps，
// 使用selectorFactory生成Selector作为props注入组件。
// 其次订阅store的变化，每次更新组件会取到最新的props