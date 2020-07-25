import Router from 'next/router';
import { get } from 'dotty';
import { debounce } from 'throttle-debounce'

import Background from '../components/background.js';
import Nav from '../components/nav.js';
import "../styles/styles.scss";
// import { contentQuery } from '../lib/queries';
import Layout from '../components/layout';
// import sanity from '../lib/sanity'
import {
  TRANSITION_ENTERING,
  TRANSITION_EXITING,
  TRANSITION_INTERVAL_ENTER,
  TRANSITION_INTERVAL_EXIT,
  PORTFOLIO_ITEM_LIST_TYPE,
  TEAM_MEMBER_LIST_TYPE,
  DISTANCE_THRESHOLD_RATIO,
  RESIZE_DEBOUNCE_TIME,
  SCROLL_UPDATE_INTERVAL,
  THEME_DARK,
  THEME_LIGHT,
  TRACKBAR_HEIGHT,
  checkOnInterval,
  getDocumentImages
} from '../lib/util';

export default class Home extends React.Component {

  scrollContainerChildren = []
  scrollableHeight = 0
  windowHeight = 0

  constructor({ activeSlug }) {
    super();
    this.state = {
      activeFrameId: 'home',
      transitionState: TRANSITION_ENTERING,
      theme: THEME_LIGHT
    }
  }

  // static async getInitialProps({ req }) {
  //   const about = await sanity.fetch(aboutQuery);
  //   const activeSlug = req.url.replace("/", "") || null;
  //   const featured = await sanity.fetch(featuredContent);
  //   const projectsRaw = await sanity.fetch(projectsQuery);
  //   const team = await sanity.fetch(teamQuery);
  //   const projects = projectsRaw
  //     .filter( item => !item.hidden )
  //     .sort((a, b) => a.title < b.title ? -1 : 1);
  //   return {
  //     about,
  //     activeSlug,
  //     featured,
  //     projects,
  //     team
  //   }
  // }

  componentDidMount() {
    this.interval = window.setInterval(
      this.updateScroll.bind(this),
      SCROLL_UPDATE_INTERVAL
    );
    window.addEventListener(
      'resize',
      debounce(RESIZE_DEBOUNCE_TIME, this.populateCachedData)
    )
    this.populateCachedData();
    this.transition(TRANSITION_ENTERING, TRANSITION_INTERVAL_ENTER, () => {}, false);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  populateCachedData = () => {
    this.scrollContainer = document.getElementById('scrollContainer');
    this.scrollContainerChildren = [].map.call(this.scrollContainer.children, c => ({
      offsetTop: c.offsetTop,
      dataset: c.dataset || {},
      height: c.clientHeight
    }))
    this.scrollableHeight = this.scrollContainerChildren.reduce((acc, c) => acc + c.height, 0);
    this.scrollBarCoefficient = (this.windowHeight - (TRACKBAR_HEIGHT + 10)) / (this.scrollableHeight - this.windowHeight)
    this.windowHeight = window.innerHeight;
  }

  transition(transitionState, interval, fn, checkLoad) {
    this.setState({
      transitionState: transitionState
    })
    window.setTimeout(() => {
      fn();
      const images = getDocumentImages();
      if (!checkLoad) {
        return this.setState({ transitionState: null })
      }
      checkOnInterval({
        every: SCROLL_UPDATE_INTERVAL,
        ifCond: () => images.every(img => img.complete),
        then: () => this.setState({ transitionState: null }),
      })
    }, interval);
  }

  transitionIn = fn => {
    this.transition(TRANSITION_ENTERING, TRANSITION_INTERVAL_ENTER, fn, true)
  }

  transitionOut = fn => {
    this.transition(TRANSITION_EXITING, TRANSITION_INTERVAL_EXIT, fn, false)
  }

  updateScroll = () => {

    if (this.state.transitionState) { return }

    try {
      const getScrollDistance = child => (
        Math.abs(this.scrollContainer.scrollTop - child.offsetTop)
      )
      const closestChild = this.scrollContainerChildren.reduce((acc, child) => {
        const distance = getScrollDistance(child);
        const bestDistance = getScrollDistance(acc);
        return distance < bestDistance ? child : acc;
      })

      const activeFrameType = closestChild.dataset.frametype;

      this.setState({
        activeFrameType,
        activeFrameId: closestChild.dataset.frameid,
      });

    } catch (e) {
      console.log(e);
    }
  }

  onLinkClick = e => {
    const destinationFrameId = e.target.dataset.frameid;
    console.log(e.target.dataset)
    if (!destinationFrameId) {
      return;
    }
    this.onScrollNavRequest({ id: `module--${ destinationFrameId }` })
  }


  onScrollNavRequest = ({ direction, id, scroll }) => {

    let el;
    if ( typeof id !== undefined) {
      el = document.getElementById(id);
    }
    if (!el) {
      return;
    }

    // Determine if we should do a scroll or fade animation
    if (scroll !== false && Math.abs(parseInt(el.dataset.frameid) - this.state.activeFrameId) <=  1) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.updateScroll();
    } else {
      this.transitionOut(() => {
        el.scrollIntoView()
        this.updateScroll();
      })
    }

  }

  render() {
    return (
      <Layout
        { ...this.props }
        isTransitioning={ this.state.isTransitioning }
        transitionState={ this.state.transitionState }
        activeFrameId={ this.state.activeFrameId }
      >
        <Background
          activeFrameIde={ this.state.activeFrameId }
        />
        <div className="scroll-hider">
          <Nav
            activeFrameId={ this.state.activeFrameId }
            onLinkClick={ this.onLinkClick }
          />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module space-between" data-frameid="home" id="module--home">
              <div className="row">
                <div className="col col-2">
                  We’re NYC’s largest, donation-based community food pantry. We provide free food for anyone in need.
                </div>
                <div className="col col-1">
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Do you want to help us?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>
                      <a href="#volunteer" data-frameid="volunteer" onClick={ this.onLinkClick }>Volunteer</a>
                    </li>
                    <li>
                      <a href="#donate" data-frameid="donate" onClick={ this.onLinkClick }>Donate</a>
                    </li>
                    <li>
                      <a href="#share" data-frameid="share" onClick={ this.onLinkClick }>Share</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Do you need groceries?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>
                      <a href="#need" data-frameid="need" onClick={ this.onLinkClick } >Get Food</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Who are we?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>
                      <a href="#about" data-frameid="about" onClick={ this.onLinkClick } >About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="module" data-frameid="volunteer" id="module--volunteer">
              <div className="row">
                <div className="col col-1">
                  We are always looking for volunteers to help at our food pantry located at Evangel Church in Long Island City. Our volunteers work on one of three projects: packing groceries, delivering them, and answering phone calls for orders.
                  <br/>
                  <br/>
                  To sign up:<br/>
                  <ul>
                    <li>Set up an account with New York Cares and complete the 10-minute orientation.</li>
                    <li>Use <a href="https://www.newyorkcares.org/search/projects/results?keywords=evangel%20church]">this link</a> to find a role and a shift that works for you</li>
                  </ul>
                  <br/>
                  Every shift has a limited number of sign-up slots available. If you don’t see any shifts for a particular day, it means that volunteer sign-ups are full—but we still might need help! Feel free to call us at 718-361-2817 to see if there are any cancellations, or pick a later date.
                  <br/>
                  <br/>
                  9 Million Reasons is committed to providing a safe, inclusive, and accessible working environment for all volunteers, including members of the LGBTQ+ community and people with disabilities (we can make accommodations). We do not tolerate sexual or racial harassment of any kind. In light of Covid-19, we are also following all current CDC guidelines to ensure the safety of our volunteers.
                </div>
              </div>
            </div>

            <div className="module" data-frameid="donate" id="module--donate">
              <div className="row">
                <div className="col col-1">
                  You can make tax deductible donations through our GoFundMe or through
                  our PayPal. If you choose PayPal, we get a greater percentage of the money, and encourage you to make a monthly contribution if you can
                  <br/>
                  <br/>
                  <br/>
                  &nbsp;&nbsp; Here is where your funds are going:
                  <br/>
                  <br/>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  <ul>
                    <li>Expand fridge space</li>
                    <li>Two box trucks</li>
                    <li>PPE for volunteers</li>
                    <li>Diapers and hygiene</li>
                    <li>Rice, beans, and fruit</li>
                    <li>Plastic Bags</li>
                    <li>Uline</li>
                    <li>Delivery expenses</li>
                    <li>Port-o-potty</li>
                  </ul>
                </div>
                <div className="col col-1">
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                </div>
              </div>
            </div>

            <div className="module" data-frameid="share" id="module--share">
              <div className="row">
                <div className="col col-1">
                  If you have volunteered or donated with us, or simply want to help us spread the word and get us help, please use the graphics in this link. We’ve noticed more people volunteer when their friends ask them to. These graphics are formatted for Facebook, Instagram, Twitter, and most other platforms you might use. Download directly to your phone!
                </div>
              </div>
            </div>

            <div className="module" data-frameid="need" id="module--need">
              <div className="row">
                <div className="col col-1">
                  We provide free food for anyone in need.
                  <br/>
                  <br/>
                  Visit our pantry located at Evangel Church, 39-21 Crescent Street in Long Island City, NY 11101. We’re open from 9AM to 4PM Monday through Friday, and 9AM to 12PM on Saturdays.
                  <br/>
                  <br/>
                  Please note that the current wait time can be up to 4 hours long.
                  <br/>
                  <br/>
                  We recommend bringing:
                  <br/>
                  <ul>
                  <li>A cart that can carry 50 pounds of groceries or more</li>
                  <li>Water to help you stay hydrated</li>
                  <li>An umbrella, in the event of inclement weather</li>
                  </ul>

                  If you are unable to visit us in person and want to request free grocery delivery, please call us at (718) 361-5454. We will get food to you, but there could be a wait of 2 to 3 weeks.
                  <br/>
                  <br/>
                  Expect a variety of food: raw vegetables, fresh fruit, frozen meat and cheese, canned goods, grains, and milk. Things can change based on our donation, but we are able to provide one bag from each of our sections.

                </div>
              </div>
            </div>

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
