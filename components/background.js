
export default class Background extends React.Component {

  componentDidMount() {
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

  render = () => (
    <div className="background">
      <div className="background--img" style={{ backgroundImage: `url(/bg-2.jpg)` }} />
      <div className="background--img" style={{ backgroundImage: `url(/bg-6.jpg)` }} />
      <div className="background--img" style={{ backgroundImage: `url(/bg-5.jpg)` }} />
      <div className="background--img" style={{ backgroundImage: `url(/bg-3.jpg)` }} />
      <div className="background--img" style={{ backgroundImage: `url(/bg-4.jpg)` }} />
      <div className="background--img" style={{ backgroundImage: `url(/bg-1.jpg)` }} />
    </div>
  )
}
