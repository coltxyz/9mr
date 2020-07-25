import classnames from 'classnames';


const Link = props => (
  <li className={ classnames(props.className, { active: props.activeFrameId === props.frameId})}>
    <a href={`#${ props.frameId }`} data-frameid={props.frameId} onClick={ props.onLinkClick }>
      { props.children }
    </a>
  </li>
)

class Nav extends React.Component {
  render() {
    switch (this.props.activeFrameId) {
      case 'home':
        return (
            <nav>
              9<br/>
              Million<br/>
              Reasons<br/>
            </nav>
        )
        break;
      default:
        return (
          <nav>
            9MR
            <br/>
            <br/>
            <ul>
              <Link frameId="volunteer" {...this.props }>
                Volunteer
              </Link>
              <Link frameId="donate" {...this.props }>
                Donate
              </Link>
              <Link frameId="share" {...this.props }>
                Share
              </Link>
              <li className="blank"/>
              <Link frameId="need" {...this.props }>
                Get Food
              </Link>
              <li className="blank"/>
              <Link frameId="about" {...this.props }>
                About
              </Link>
              <li className="blank"/>
              <Link frameId="contact" {...this.props } className="align-bottom">
                Contact
              </Link>
            </ul>
          </nav>
        )
        break;
    }
  }
}

export default Nav;
