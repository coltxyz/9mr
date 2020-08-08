import { get } from 'dotty';
import MediaPlayer from './media-player';

export default class ProjectDetail extends React.Component {

  constructor({ data, activeImageId }) {
    super()
    const index = (data.images || []).findIndex(
      img => img._key === activeImageId
    )
    this.state = {
      activeImageIndex: index >= 0 ? index : 0
    }
  }

  onThumbnailClick = index => {
    this.setState({
      activeImageIndex: index
    })
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (get(nextProps, 'data._id') !== get(this, 'props.data._id')) {
      this.setState({
        activeImageIndex: 0
      })
      document.getElementsByClassName('sidescroll-mobile-container')[0].scrollTo(0, 0);
    }
  }

  render() {
    if (!this.props.data) {
      return <div />;
    }
    const projectImages = this.props.data.images;
    let activeImage = projectImages[this.state.activeImageIndex]
    return (
      <div className="project-detail">
        <div className="project-detail__inner">
          <div className="project-detail__main-photo">
            <div className="rel sidescroll-mobile-container">
              {
                projectImages.map( (image, i) => (
                  <MediaPlayer
                    image={ image }
                    className="media"
                    activeClassName="main-photo--active"
                    inactiveClassName="main-photo--inactive"
                    isActive={ get(activeImage, '_key') === image._key }
                  />
                ))
              }
            </div>
          </div>
          <div className="project-detail__side-panel">
            <div className="project-detail__side-panel__thumbnails">
              {
                projectImages.map( (image, i) => (
                  <div
                    className="thumbnail"
                    key={ image._key }
                  >
                    <MediaPlayer
                      onClick={ () => this.onThumbnailClick(i) }
                      className="rel"
                      activeClassName="thumbnail--active"
                      inactiveClassName="thumbnail--inactive"
                      image={ image }
                      isActive={ get(activeImage, '_key') === image._key }
                    />
                  </div>
                ))
              }
            </div>
            <div className="project-detail__side-panel__description">
              <div className="project-detail__dots">
                {
                  projectImages.map( () => (
                    <div className="dot" />
                  ))
                }
              </div>
              <p>
                { this.props.data.description }
              </p>
              <p className="mono">
                { this.props.data.year && `Completed: ${ this.props.data.year}`}
                <br/>
                { this.props.data.location && `Location: ${ this.props.data.location }`}
                <br/>
                { get(activeImage, 'title') && `Pictured: ${ activeImage.title }` }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
