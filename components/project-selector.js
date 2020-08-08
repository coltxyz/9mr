import classname from 'classnames';
import Link from 'next/link';
import { get } from 'dotty';

class ProjectSelector extends React.Component {

  constructor() {
    super();
    this.state = {
      isMenuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }

  hide = () => {
    this.setState({
      isMenuOpen: false
    })
  }

  onLinkClick = (e, item) => {
    e.preventDefault();
    this.setState({
      isMenuOpen: false
    });
    this.props.onProjectChange({
      slug: get(item, 'slug.current')
    });
  }

  render() {
    const {items, activeItem, onChange} = this.props;
    if (!items || !activeItem) {
      return <span />
    }
    const menuItems = items
      .filter( item => item._id !== activeItem._id)
    return (
      <div
        className={ classname("project-selector", {
          visible: this.state.isMenuOpen
        })}
        onMouseLeave={ this.hide }
      >
        <span className="project-selector__selected" onClick={ this.toggleMenu }>
          { activeItem.title }
        </span>
        <div className="project-selector__menu">
          {
            menuItems.map( item => (
              <div
                key={ item._id }
                className="project-selector__menu-item"
                onClick={ (e) => this.onLinkClick( e, item )}
              >
                { item.title }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ProjectSelector
