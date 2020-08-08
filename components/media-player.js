import { get } from 'dotty';
import classnames from 'classnames';
import SanityMuxPlayer from 'sanity-mux-player';
import { urlFor, aspectRatioForImage, calcDimensions } from '../lib/util';

class MediaPlayer extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
      isPlaying: false,
      shouldLoadVideo: false
    }
  }

  componentDidMount() {
    /*
      On mobile, don't play or load videos
    */
    const windowWidth = window.innerWidth
    if (windowWidth >= 400) {
      this.setState({
        isReady: true,
        isPlaying: true,
        shouldLoadVideo: true
      });
    } else {
      this.setState({
        isReady: true
      })
    }
  }

  render() {
    let {
      image,
      width,
      height,
      className,
      activeClassName,
      inactiveClassName,
      onClick,
      isActive
    } = this.props;

    if (!this.state.isReady) {
      return <div className={ classnames('l', className, { 'media--active': isActive } ) } />
    }

    /*
      For tall images, adjust the sizing
    */
    const { windowHeight } = calcDimensions();
    const aspectRatio = aspectRatioForImage(image);
    height = Math.min(height, Math.floor(windowHeight * 0.50))
    width = height * aspectRatio

    const colorLqip = get(image, 'imageColor.asset.metadata.lqip');
    const monoLqip = get(image, 'imageMono.asset.metadata.lqip');

    return (
      image.videoColor ? (
        <div
          className={ classnames('l', className, { 'media--active': isActive } ) }
          onClick={ onClick }
          ref="containerElement"
        >
          <SanityMuxPlayer
            assetDocument={get(image, 'videoMono.asset') || get(image, 'videoColor.asset')}
            autoload={ this.state.shouldLoadVideo }
            autoplay={ this.state.isPlaying }
            className={ classnames('mediaplayer', inactiveClassName, {
              'mock--monotone': !Boolean( image.videoMono )
            }) }
            loop={true}
            muted={true}
            showControls={false}
            height={ height }
            width={ width }
            style={{ height: '100%'}}
          />
          <SanityMuxPlayer
            assetDocument={get(image, 'videoColor.asset')}
            autoload={ this.state.shouldLoadVideo }
            autoplay={ this.state.isPlaying }
            className={ classnames( 'mediaplayer', activeClassName) }
            loop={true}
            muted={true}
            showControls={false}
            style={{ opacity: isActive ? 1 : 0, height: '100%'}}
            height={ height }
            width={ width }
          />
        </div>
      ) : (
        <div
          className={ classnames('l', className, { 'media--active': isActive } ) }
          onClick={ onClick }
          ref="containerElement"
        >
          <img
            key={ get(image,'imageMono._id') || 'abc123'}
            className={ classnames('image', inactiveClassName, {
              'mock--monotone': !Boolean( image.imageMono )
            }) }
            src={ urlFor(image.imageMono, width) || urlFor(image.imageColor, width) }
            style={{
              width,
              height,
              backgroundImage: `url(${ monoLqip || colorLqip })`
            }}
          />
          <img
            key={ get(image,'imageColor._id') || 'xyz456'}
            className={ classnames('image', activeClassName) }
            src={ urlFor(image.imageColor, width) }
            style={{
              width,
              height,
              opacity: isActive ? 1 : 0,
              backgroundImage: `url(${ colorLqip })`
            }}
          />
        </div>
      )
    )
  }
}

export default MediaPlayer;
