import classnames from 'classnames';
import Draggable from 'react-draggable';
import Sun from './svg/sun';
import Moon from './svg/moon';
import {
  THEME_DARK,
  THEME_LIGHT
} from '../lib/util';

class Nav extends React.Component {

  constructor() {
    super();
    this.state = {
      isDragging: false
    }
  }

  triggerScroll = id => e => {
    e.preventDefault();
    this.props.onScrollNavRequest({ id: id });
  }

  render() {
    return (
      <div>
        <nav>
          <a
            href="#portfolio"
            onClick={ this.triggerScroll('portfolio') }
          >
            Portfolio
          </a>
          <a
            href="#about"
            onClick={ this.triggerScroll('about') }
          >
            About
          </a>
          <a
            href="#contact"
            onClick={ this.triggerScroll('contact') }
          >
            Contact
          </a>
          <div
            className="theme-toggle"
            onClick={ this.props.onToggleTheme }
          >
            {
              this.props.theme === THEME_LIGHT
                ? <Moon color="var(--black-ln)" />
                : <Sun color="var(--black-ln)" />
            }
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav;
