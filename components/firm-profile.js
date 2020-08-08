import classname from 'classnames';

const FirmProfile = props => (
  <div
    id={ props.id }
    className={classname("flex-container module about-pg bg-gray", {
      'module--active': props.activeFrameId === props.frameId
    })}
    data-frametype="informational"
    data-frameid={ props.frameId }
  >
    <div className="about-pg__inner__left">
      <p className="uppercase bold">
        { props.content.firmProfileTitle }
      </p>
      <p>
        { props.content.firmProfileBody }
      </p>
    </div>
    <div className="margin-copy mono">
      <p>about us</p>
    </div>
  </div>
)

export default FirmProfile
