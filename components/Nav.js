import classnames from 'classnames';
import Draggable from 'react-draggable';
import Sun from './svg/sun';
import Moon from './svg/moon';
import {
  THEME_DARK,
  THEME_LIGHT
} from '../lib/util';

class Nav extends React.Component {
  render() {
    switch (this.props.activeFrameType) {
      case 'home':
        return (
            <nav>
              9<br/>
              Million<br/>
              Reasons<br/>
            </nav>
        )
        break;
      case 'body':
        return (
          <nav>
            9MR
            <br/>
            <br/>
            <ul>
              <li>Volunteer</li>
              <li>Donate</li>
              <li>Share</li>
              <li className="blank"/>
              <li>Get Food</li>
              <li className="blank"/>
              <li>About</li>
              <li>Gallery</li>
              <li className="blank"/>
              <li className="align-bottom">Contact</li>
            </ul>
          </nav>
        )
        break;
      default:
        return (
          <div />
        )

    }
  }
}

export default Nav;
