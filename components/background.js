import React from 'react';
import { urlFor } from '../lib/util.js';

export default class Background extends React.Component {

  constructor({ images }) {
    super()
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    const images = this.props.images.map( img => urlFor(img) );
    this.setState({
      images
    }, this.runAnimation)
  }

  runAnimation() {
    const backgroundImages = document.querySelectorAll('.background--img');
    let imageIndex = backgroundImages.length - 1;
    window.setInterval(() => {
      const image = backgroundImages[imageIndex];
      image.style.opacity = 0
      if (imageIndex <= 0) {
        imageIndex = backgroundImages.length - 1;
        for (var i = 0; i < backgroundImages.length; i++) {
          backgroundImages[i].style.opacity = 1;
        }
      } else {
        imageIndex--;
      }
    }, 5000)
  }

  render = () => {
    return (
      <div className="background">
        {
          this.state.images.map( img => {
            return (
              <div
                className="background--img"
                key={ img }
                style={{
                  backgroundImage: `url(${ img })`
                }}
              />
            )
          })
        }
      </div>
    )
  }
}
