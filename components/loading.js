const UPDATE_INTERVAL = 600;

class Loading extends React.Component {

  constructor() {
    super();
    this.state = {
      dots: 0
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      const nextDots = this.state.dots > 3 ? 0 : this.state.dots + 1;
      this.setState({
        dots: nextDots
      })
    }, UPDATE_INTERVAL)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const dots = ({
      0: '',
      1: '.',
      2: '..',
      3: '...',
      4: '....'
    })[ this.state.dots ];
    return (
      <span className="mono"> Loading { dots } </span>
    )
  }
}

export default Loading;
