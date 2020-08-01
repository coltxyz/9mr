import Router from 'next/router'
import BlockContent from '@sanity/block-content-to-react'
import { get } from 'dotty'
import classnames from 'classnames'

import Background from '../components/background.js'
import Nav from '../components/nav.js'
import { globalQuery } from '../lib/queries'
import Layout from '../components/layout'
import sanity from '../lib/sanity'

import "../styles/styles.scss"

export default class Home extends React.Component {

  static async getInitialProps({ req }) {
    const globals = await sanity.fetch(globalQuery);
    const activeSlug = req.url.replace("/", "") || null;
    return {
      globals,
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
    const globals = get(this.props, 'globals.0' ) || {}
    return (
      <Layout
        activeSlug={ null }
        globals={ globals }
      >
          <Background images={ globals.homepage_background_images }/>
          <nav>
            <p className="color--white">
              9&nbsp;<br/>
              Million&nbsp;<br/>
              Reasons&nbsp;<br/>
            </p>
          </nav>
          <div className="content-main">
            <div className={ classnames('module') }>
              <div className="row">
                <div className="col col-1">
                  <p className="home-description">
                    { globals.homepage_description }
                  </p>
                </div>
              </div>
              <div className="homepage-special-rows">
                <div className="row">
                  <div className="col col-2">
                    <p>{ globals.homepage_section_1 }</p>
                  </div>
                  <div className="col col-1">
                    <ul>
                      <li><a href="/volunteer">Volunteer</a></li>
                      <li><a href="/donate">Donate</a></li>
                      <li><a href="/share">Share</a></li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-2">
                    <p>{ globals.homepage_section_2 }</p>
                  </div>
                  <div className="col col-1">
                    <ul>
                      <li><a href="/food">Get Food</a></li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-2">
                    <p>{ globals.homepage_section_3 }</p>
                  </div>
                  <div className="col col-1">
                    <ul>
                      <li><a href="/about">About</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Layout>
    )
  }
}
