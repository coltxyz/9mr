import Router from 'next/router';
import { get } from 'dotty';
import { debounce } from 'throttle-debounce'

import Background from '../components/background.js';
import Nav from '../components/nav.js';
import "../styles/styles.scss";
// import { contentQuery } from '../lib/queries';
import Layout from '../components/layout';
// import sanity from '../lib/sanity'


export default class Donate extends React.Component {

  render() {
    return (
      <Layout { ...this.props }>
        <div className="scroll-hider">
          <Nav
            activeFrameId="contact"
            onLinkClick={ this.onLinkClick }
          />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module" data-frameid="contact" id="module--contact">
              <div className="row">
                <div className="col col-1">
                9 Million Reasons<br/>
                39-21 Crescent Street,<br/>
                Long Island City, NY 11101<br/>
                <br/>

                For General Qs: info@9mr.nyc or (718) 361-2817 <br/>
                For Operations & Outreach: john@9mr.nyc <br/>
                For Development & Media: andrew@9mr.nyc <br/>
                For Social and Web: daniel@9mr.nyc<br/>
                <br/>
                Follow:<br/>
                https://www.instagram.com/9millionreasons/<br/>
                https://www.facebook.com/9millionreasons/<br/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
