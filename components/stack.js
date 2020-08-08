import classname from 'classnames';
import { get } from 'dotty';
import { debounce } from 'throttle-debounce';

import MediaPlayer from './media-player';
import {
  calcDimensions,
  aspectRatioForImage,
  STACK_SHUFFLE_ANIMATION_TIME,
  RESIZE_DEBOUNCE_TIME
} from '../lib/util';

export default class Stack extends React.Component {

  static defaultProps = {
    imgWidthRatio: [1/2, 1/2],
    isVisible: true,
    isExpanded: false,
    isActiveFrame: false
  }

  constructor({ images }) {
    super();
    this.state = {
      isReady: false,
      currentTargetId: null,
      isAnimating: false
    };
    this.target = null;
    this.imageTransforms = null;
    this.imageStack = images.map( image => (image._key) );
    this.avgImgHeight = 600;
  }

  componentDidMount() {
    this.computeTransforms();
    this.setState({
      isReady: true
    });
    window.addEventListener(
      'resize',
      debounce(RESIZE_DEBOUNCE_TIME, this.computeTransforms.bind(this)
    ))
  }

  computeAvgImageHeight(images) {
    const {windowWidth, windowHeight} = calcDimensions();
    let sumHeights = 0;
    let numHeights = 0;
    for (var i = 0; i < images.length; i++) {
      const imgWidth = windowWidth * this.props.imgWidthRatio[0];
      const imgAspect = aspectRatioForImage(images[i]);
      let imgHeight = imgWidth / imgAspect;
      if (imgAspect <= 1) {
        imgHeight = Math.min(imgHeight, Math.floor(windowHeight * 0.55))
      }
      if (typeof imgHeight === 'number') {
        sumHeights += imgHeight
        numHeights ++
      } else {
        console.log('NO')
      }
    }
    this.avgImgHeight = sumHeights / numHeights
  }

  computeTransforms() {
    this.computeAvgImageHeight(this.props.images);
    const { unit } = calcDimensions()
    this.imageTransforms = this.imageStack.reduce((acc, imgId, i) => {
      acc[imgId] = { x:unit*i , y: -unit*i , s: 1};
      return acc;
    }, {});
  }

  onMouseEnter = () => {
    this.setState({
      currentTargetId: this.imageStack[this.imageStack.length - 1]
    });
  }

  onMouseLeave = () => {
    this.setState({
      currentTargetId: null
    });
  }

  updateState = state => {
    if (this.props.onChange) {
      this.props.onChange(state)
    }
    this.setState(state)
  }

  onStackClick = () => {
    this.imageStack.unshift(this.imageStack.pop())
    const currentTargetId = this.imageStack[this.imageStack.length - 1];
    this.computeTransforms();
    this.updateState({
      currentTargetId,
      isAnimating: true
    })
    window.setTimeout(() => {
      this.updateState({
        isAnimating: false
      })
    }, STACK_SHUFFLE_ANIMATION_TIME)
    if (this.props.onStackClick) {
      this.props.onStackClick({
        topMostImageId: currentTargetId,
        dataSourceId: this.props.dataSourceId
      })
    }
  }

  getTransform({ id, isActiveFrame }) {
    if (!this.imageTransforms) {
      return;
    }
    const { x, y, s } = this.imageTransforms[id];
    return `translate(${ x }px, ${ y }px) scale(${ s })`;
  }

  onDetailClick = (e) => {
    e.preventDefault();
    this.props.onDetailClick && this.props.onDetailClick();
  }

  render() {
    let { shouldLoadVideo } = this.props;
    let isPlaying = true;
    if (!this.state.isReady) {
      return <div className={ classname("stack-wrapper", this.props.className)} />
    }

    const {windowWidth, windowHeight, unit, actualWidth} = calcDimensions();
    let imgWidth = windowWidth * this.props.imgWidthRatio[0];
    let stackWidth = imgWidth + (this.imageStack.length - 1) * unit;
    let imgHeight = this.avgImgHeight + (this.imageStack.length - 1) * unit;

    if (actualWidth < 400) {
      imgWidth = actualWidth * this.props.imgWidthRatio[1];
      stackWidth = imgWidth + (this.props.images.length - 1) * unit;
      imgHeight = this.avgImgHeight + (this.props.images.length - 1) * unit;
    }

    return (
      <div
        id={ this.props.id }
        data-frametype={ this.props.frameType }
        data-frameid={ this.props.frameId }
        data-sourceid={ this.props.dataSourceId }
        className={classname(
          "stack-wrapper",
          this.props.className,
          {
            'stack--expanded': this.props.isExpanded,
            'module--active': this.props.isActiveFrame
          }
        )}
      >
        {
          this.props.marginCopy && (
            <div className="margin-copy mono">
              <p>{ this.props.marginCopy }</p>
            </div>
          )
        }
        <div
          ref="stackContainerRef"
          className="stack"
          style={{
            width: stackWidth,
            height: imgHeight
          }}
        >
          {
            this.props.images.map( image => {
              const aspectRatio = aspectRatioForImage(image);
              return (
                <div
                  onMouseEnter={ this.onMouseEnter }
                  onMouseLeave={ this.onMouseLeave }
                  onClick={ this.onStackClick }
                  key={ image._key }
                  className="stack__image"
                  style={{
                    transform: this.getTransform({
                      id: image._key,
                      isActiveFrame: this.props.isActiveFrame
                    }),
                    zIndex: this.imageStack.indexOf(image._key) + 10
                  }}
                >
                  <MediaPlayer
                    image={ image }
                    className="stack__image__inner"
                    activeClassName="stack-img-active"
                    inactiveClassName="stack-img-default"
                    width={ imgWidth }
                    height={ imgWidth / aspectRatio }
                    isActive={ this.props.isActiveFrame && image._key === this.imageStack[this.imageStack.length - 1] }
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }

}
