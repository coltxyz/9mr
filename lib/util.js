import { get } from 'dotty';
import imageUrlBuilder from '@sanity/image-url'
import sanity from './sanity'

export const API_GATEWAY_BASE = "https://w3acxezia6.execute-api.us-east-1.amazonaws.com/dev";
export const API_STATUS_ERROR = "api_error";
export const API_STATUS_SUCCESS = "api_success";
export const API_STATUS_LOADING = "api_loading";
export const PORTFOLIO_ITEM_LIST_TYPE = 'portfolio-item-list'
export const TEAM_MEMBER_LIST_TYPE = 'team-member-list'
export const TRANSITION_ENTERING = 'transition--entering'
export const TRANSITION_EXITING = 'transition--exiting'
export const TRANSITION_INTERVAL_ENTER = 500
export const TRANSITION_INTERVAL_EXIT = 300
export const DISTANCE_THRESHOLD = 150;
export const DISTANCE_THRESHOLD_RATIO = 0.15;
export const SCROLL_UPDATE_INTERVAL = 100;
export const STACK_SHUFFLE_ANIMATION_TIME = 200;
export const RESIZE_DEBOUNCE_TIME = 1000;
export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';
export const TRACKBAR_HEIGHT = 90;
export const MAX_LOAD_TIME = 3000;

export const COLORS = {
  [THEME_LIGHT]: {
    black: '#000',
    white: '#FFFF',
    gray: '#888'
  }
}

const now = () => new Date().getTime();

export const getBucketedWindowWidth = () => {
  return Math.ceil(window.innerWidth / 200) * 200
}

export const getBucketedWindowHeight = () => {
  return Math.ceil(window.innerHeight / 200) * 200
}

export const calcDimensions = () => {
  const windowWidth = Math.min(
    Math.max(getBucketedWindowWidth(), 600),
    Math.floor(getBucketedWindowHeight() * 4/3)
  )
  const windowHeight = Math.max(getBucketedWindowHeight(), 400);
  const unit = windowWidth / 60;
  return {
    windowWidth,
    windowHeight,
    unit,
    actualWidth: window.innerWidth
  }
}

export const urlFor = (image, width) => {
  if (!image || !image.asset) {
    return ''
  }
  const aspectRatio = aspectRatioForImage(image);
  const builder = imageUrlBuilder(sanity)
  const { windowWidth, windowHeight } = calcDimensions();
  let assetWidth = width ? Math.floor(width * 1.25) : getBucketedWindowWidth();
  return builder.image(image.asset).width(assetWidth).url();
}

export const processTeamImages = rawItem => {
  return {
    _key: rawItem._id,
    imageMono: rawItem.photo,
    imageColor: rawItem.photo
  }
}

export const getDocumentImages = () => {
  const images = []
  for (var i = 0; i < document.images.length; i++) {
    images.push(document.images[i]);
  }
  return images;
}

export const checkOnInterval = ({ifCond, then, every}) => {
  const startTime = now();
  function loop() {
    window.setTimeout(() => {
      const elapsedTime = now() - startTime;
      if (ifCond() || elapsedTime > MAX_LOAD_TIME) {
        window.setTimeout(then, every);
      } else {
        loop()
      }
    }, every)
  }
  loop();
}

export const aspectRatioForImage = image => {
  const imgAspectRatio = get(image, 'imageColor.asset.metadata.dimensions.aspectRatio');
  const videoAspectRatio = ({
    '16:9': (16/9),
    '4:3': (4/3)
  })[ get(image, 'videoColor.asset.data.aspect_ratio')];
  return imgAspectRatio || videoAspectRatio || (4/3);
}
