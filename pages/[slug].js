import Router from 'next/router'
import BlockContent from '@sanity/block-content-to-react'
import { get } from 'dotty'
import classnames from 'classnames'

import Nav from '../components/nav.js'
import { contentQuery } from '../lib/queries'
import Layout from '../components/layout'
import sanity from '../lib/sanity'

import "../styles/styles.scss"

export default class Home extends React.Component {

  static async getInitialProps({ req }) {
    const content = await sanity.fetch(contentQuery);
    const activeSlug = req.url.replace("/", "") || null;
    return {
      content,
      activeSlug
    }
  }

  getPageContent = () => {
    try {
      return this.props.content.find( item => get(item, 'page_slug.current') == this.props.activeSlug)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const content = get(this.getPageContent(), 'page_content') || []
    return (
      <Layout activeSlug={ this.props.activeSlug }>
        <Nav activeSlug={ this.props.activeSlug } />
        <div className="content-main">
          <div className={ classnames('module', {'space-between': !this.props.activeSlug })}>
            {
              content.map( item => {
                if (item._type === 'one_column_row') {
                  return (
                    <div className="row">
                      <div className="col col-1">
                        <BlockContent blocks={ item.row } />
                      </div>
                    </div>
                  )
                } else if (item._type === 'two_column_row') {
                  return (
                    <div className="row">
                      <div className="col col-2">
                        <BlockContent blocks={ item.row_left } />
                      </div>
                      <div className="col col-1">
                        <BlockContent blocks={ item.row_right } />
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </Layout>
    )
  }
}
