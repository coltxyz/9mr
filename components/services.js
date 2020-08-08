const Services = props => (
  <div
    className="flex-container module about-pg about-pg--services bg-gray"
    data-frametype="informational"
    data-frameid={ props.frameId }
  >
    <div className="about-pg__inner">
      <div className="about-pg__inner__left">
        <p className="uppercase bold">
          { props.content.servicesTitle }
        </p>
        <p>
          { props.content.servicesBody }
        </p>
      </div>
      <div className="about-pg__inner__right">
        {
          props.content.servicesList.map(service => (
            <h4 key={service}>{ service }</h4>
          ))
        }
      </div>
    </div>
  </div>
)

export default Services
