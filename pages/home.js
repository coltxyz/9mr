import Router from 'next/router';
import { get } from 'dotty';
import { debounce } from 'throttle-debounce'

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
      activeFrameId: 0,
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
        activeFrameId: parseInt(closestChild.dataset.frameid),
        activeDataSrcId: closestChild.dataset.sourceid
      });

    } catch (e) {
      console.log(e);
    }
  }


  onScrollNavRequest = ({ direction, id, scroll }) => {
    let el;
    if (direction === 'up') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId - 1 }']`);
    } else if (direction === 'down') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId + 1 }']`);
    } else if (direction === 'center') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId }']`);
    } else if ( typeof id !== undefined) {
      el = document.getElementById(id);
    }

    if (!el) {
      return;
    }

    // Determine if we should do a scroll or fade animation
    if (scroll !== false && Math.abs(parseInt(el.dataset.frameid) - this.state.activeFrameId) <=  1) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.hideProjectDetail();
      this.updateScroll();
    } else {
      this.transitionOut(() => {
        el.scrollIntoView()
        this.hideProjectDetail();
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
        activeFrameType={ this.state.activeFrameType }
      >
        <div className="scroll-hider">
          <Nav activeFrameType={ this.state.activeFrameType } />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module" data-frametype="home">
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
                    <li>Volunteer</li>
                    <li>Donate</li>
                    <li>Share</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Do you need groceries?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>Get Food</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Who are we?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>About</li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="module"
              data-frametype="body"
            >
              <div className="row">
                <div className="col col-1">
                  You can make tax deductible donations through our GoFundMe or through
                  our PayPal. If you choose PayPal, we get a greater percentage of the money, and encourage you to make a monthly contribution if you can
                  <br/>
                  <br/>
                  <br/>
                  &nbsp;&nbsp; Here is where your funds are going:
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
          </div>
        </div>
      </Layout>
    )
  }
}
