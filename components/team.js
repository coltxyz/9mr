import { processTeamImages } from '../lib/util';
import Stack from './stack';

class Team extends React.Component {

  constructor(props) {
    super()
    this.state = {
      isAnimating: false,
      activeTeamMemberIndex: 0
    }
  }

  onStackItemChange = ({ isAnimating, currentTargetId }) => {
    let activeTeamMemberIndex = this.state.activeTeamMemberIndex;
    if (currentTargetId) {
      activeTeamMemberIndex = this.props.content.findIndex(
        el => el._id === currentTargetId
      )
    }
    this.setState({
      isAnimating,
      activeTeamMemberIndex
    })
  }

  render() {
    const props = this.props;
    const teamMemberName = props.content[ this.state.activeTeamMemberIndex ].name;
    const teamMemberBio = props.content[ this.state.activeTeamMemberIndex ].bio;
    return (
      <div
        className="module bg-gray"
        data-frametype="informational"
        data-frameid={ props.frameId }
      >
        <div className="about-pg__inner">
          <div className="about-pg__inner__left">
            <Stack
              className="team-stack"
              isActiveFrame={ props.activeFrameId  === props.frameId }
              imgWidthRatio={ [1/7, 1/4] }
              images={ props.content.map( processTeamImages ).reverse() }
              marginCopy="team"
              onChange={ this.onStackItemChange }
              frameId="team-stack-frame"
            />
          </div>
          <div className="about-pg__inner__right team-bio">
            <p>
              <strong>{ teamMemberName }</strong> { teamMemberBio }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Team
