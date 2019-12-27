import React, { Component} from 'react'
import Layout from '../../layouts/default'
import { Menu } from 'antd'
import { request} from '../../lib'
import Content from './content'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      years: ['2015', '2014', '2013', '2012'],
      type: this.props.match.params.type,
      year: this.props.match.params.year,
      movies: []
    }
  }

  componentDidMount () {
    this._getAllMovies()
  }

  _getAllMovies = () => {
    request(window.__LOADING__)({
      method: 'get',
      url: `/api/v0/movies?type=${this.state.type || ''}&year=${this.state.year || ''}`
    }).then(res => {
      this.setState({
        movies: res
      })
    }).catch(() => {
      this.setState({
        movies: []
      })
    })
  }

  _selectItem = ({ key }) => {
    this.setState({
      selectedKey: key
    })
  }

  _renderContent = () => {
    const { movies } = this.state

    if (!movies || !movies.length) return null
    
    return (
      <Content movies = {movies} />
    )
  }

  render () {
    const { years, selectedKey } = this.state
    return (
      <Layout {...this.props}>
        <div className='flex-row full'>
          <Menu
            defaultSelectedKeys={[selectedKey]}
            mode="inline"
            style={{height: '100%', overflowY: 'scroll', maxWidth: '230px'}}
            onSelect={this._selectItem}
            className='align-self-start'
          >
            {
              years.map((e, i) => (
                <Menu.Item key={i}>
                  <a href={`/year/${e}`}>{e} 年上映</a>
                </Menu.Item>
              ))
            }
          </Menu>
          <div className='flex-1 scroll-y align-self-start'>
            {this._renderContent()}
          </div>
        </div>
      </Layout>
    )
  }
}