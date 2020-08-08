import superagent from 'superagent';
import validator from 'email-validator';
import classnames from 'classnames';

import Loading from './loading';
import { API_GATEWAY_BASE } from '../lib/util';
import VolleyLogo from './svg/volley-logo';

import {
  API_STATUS_ERROR,
  API_STATUS_LOADING,
  API_STATUS_SUCCESS
} from '../lib/util';

class Contact extends React.Component {

  constructor() {
    super();
    this.state = {
      apiStatus: null,
      email: '',
      message: '',
      hasInvalidEmail: false,
      hasInvalidMessage: false
    }
  }

  onSubmitClick = () => {
    this.setState({
      apiStatus: API_STATUS_LOADING
    });

    const { email, message } = this.state;
    const hasInvalidEmail = !validator.validate(email);
    const hasInvalidMessage = !message;

    if (hasInvalidEmail || hasInvalidMessage) {
      return this.setState({
        hasInvalidEmail,
        hasInvalidMessage,
        apiStatus: null
      })
    }

    superagent
      .post(`${ API_GATEWAY_BASE }/contact`)
      .send({
          "fromAddress": this.props.content.contactEmail,
          "toAddress": email,
          "message": message,
          "subject": this.props.content.emailSubject,
          "footer": this.props.content.contactEmailFooter
      })
      .then( res => {
        this.setState({
          apiStatus: API_STATUS_SUCCESS
        })
      }).catch( err => {
        console.log(err)
        this.setState({
          apiStatus: API_STATUS_ERROR
        })
      })
  }

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({
      message: val,
      hasInvalidMessage: false
    })
  }

  onInputChange = (e) => {
    const val = e.target.value;
    this.setState({
      email: val,
      hasInvalidEmail: false
    })
  }

  renderInnerContent() {
      if (this.state.apiStatus === API_STATUS_LOADING) {
        return (
          <div className="contact-card__status">
            <Loading />
          </div>
        )
      } else if (this.state.apiStatus === API_STATUS_ERROR) {
          return (
            <div className="contact-card__status">
              We're sorry, an error occurred and the message didn't go through.
            </div>
          )
      } else if (this.state.apiStatus === API_STATUS_SUCCESS) {
          return (
            <div className="contact-card__status">
              { this.props.content.successMessage }
            </div>
          )
      }
      return (
        <textarea
          className={classnames({
            'form-invalid': this.state.hasInvalidMessage
          })}
          onChange={ this.onTextChange }
          placeholder={ this.props.content.contactPrompt }
        />
      )
  }

  render() {
    const props = this.props;
    return (
      <div
        id={ props.id }
        className={classnames("flex-container module bg-white", {
          'module--active': props.activeFrameId === props.frameId,
          'contact--loading': this.state.apiStatus === API_STATUS_LOADING,
          'contact--error': this.state.apiStatus === API_STATUS_ERROR,
          'contact--success': this.state.apiStatus === API_STATUS_SUCCESS
        })}
        data-frameid={ props.frameId }
        data-frametype="fin"
      >
        <div className="margin-copy mono">
          <p>contact</p>
        </div>
        <div className="contact-card">
          <div className="contact-card__bg-1" />
          <div className="contact-card__bg-2" />
          <div className="contact-card__bg-0">
            <div className="contact-card__header">
              <div className="logo">
                <VolleyLogo color="var(--black-ln)" />
              </div>
              <div className="info">
                <p>
                  <strong>{ props.content.contactEmail }</strong>
                </p>
                <p>
                  { props.content.contactAddress1 }<br/>
                  { props.content.contactAddress2 }<br/>
                  { props.content.contactPhone }<br/>
                </p>
              </div>
            </div>
            <div className="contact-card__body">
              {
                this.renderInnerContent()
              }
            </div>
            <div
              className={classnames("contact-card__footer", {
                'form-invalid': this.state.hasInvalidEmail
              })}
            >
              <input
                onChange={ this.onInputChange }
                placeholder="your email"
              />
              <button onClick={ this.onSubmitClick }>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact
