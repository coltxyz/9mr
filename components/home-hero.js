import classname from 'classnames';
import VolleyLogo from './svg/volley-logo';

const HomeHero = props => (
  <div
    id={ props.id }
    className={ classname("home-hero module module-lg", {
      'module--active': props.isActiveFrame
    }) }
    data-frameid={ props.frameId }
    data-frametype={ props.frameType }
  >
    <div className="home-hero__copy text-center">
      <div className="logo">
        <VolleyLogo color="var(--black-ln)"/>
      </div>
      <h2>
        { props.blurb }
      </h2>
    </div>
    <div
      className="margin-copy mono"
      onClick={ props.onLatestProjectsClick }
    >
      <p>view our latest projects</p>
    </div>
  </div>
)

export default HomeHero;
