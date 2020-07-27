import classnames from 'classnames'
// import Link from 'next/link'


const Link = props => (
  <li className={ classnames(props.className, { active: props.activeSlug === props.frameId})}>
    <a href={`${ props.frameId }`} data-frameid={ props.frameId }>
      { props.children }
    </a>
  </li>
)

class Nav extends React.Component {
  render() {
    switch (this.props.activeSlug) {
      case 'volunteer':
      case 'donate':
      case 'share':
      case 'food':
      case 'about':
      case 'gallery':
      case 'contact':
        return (
          <nav>
            <a href="/" data-frameid="home">
              9MR
            </a>
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
              <Link frameId="food" {...this.props }>
                Get Food
              </Link>
              <li className="blank"/>
              <Link frameId="about" {...this.props }>
                About
              </Link>
              <Link frameId="gallery" {...this.props }>
                Gallery
              </Link>
              <li className="blank"/>
              <Link frameId="contact" {...this.props } className="align-bottom">
                Contact
              </Link>
            </ul>
          </nav>
        )
        break;
      default:
        return (
            <nav>
              <p className="color--white">
                9<br/>
                Million<br/>
                Reasons<br/>
              </p>
            </nav>
        )
        break;
    }
  }
}

export default Nav;
