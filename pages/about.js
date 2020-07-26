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
            activeFrameId="about"
            onLinkClick={ this.onLinkClick }
          />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module" data-frameid="about" id="module--about">
              <div className="row">
                <div className="col col-1">
                9 Million Reasons is operating New York City’s largest, donation-based community food pantry. We serve more New Yorkers than any other organization of our kind, distributing high-quality groceries and essential supplies to vulnerable members predominantly living in The Bronx, Queens, Brooklyn, and Upper Manhattan.
                <br/>
                <br/>
                With 9 million people living in this city, we can think of 9 million reasons to give back. We’re a secular 501(c)(3) non-profit with two full-time staffers and a volunteer network in the thousands. In addition to our pantry, we work to bring resources to our neighbors, including ESL and GED classes, job training and résumé workshops, and community events. These projects are currently on hold due to our extensive focus on the pantry during the pandemic and ongoing economic crisis.
                <br/>
                <br/>
                Since March 2020 we’ve been putting all of our efforts and energy into feeding the hungry. Food insecurity in NYC has doubled to two million and the need for good food is not declining. To help meet the demand, we’ve partnered with New York Cares, an organization that brings in an average of 30 volunteers a day, who move up to 60,000 pounds of food in seven hours. We serve up to 1,300 families a day, many of whom are from immigrant and undocumented communities.

                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
