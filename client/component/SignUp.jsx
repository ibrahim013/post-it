import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import validateInput from '../util/validation';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      errors: {},
      isLoading: false,
      isLogedIn: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.SignUpAction(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'sucess',
            text: 'You have Signed Up succesfuly'
          });
          history.pushState(null, null, '/dashboard'); window.location.reload();
        },
        err => this.setState({ errors: err.response.data,
          isLoading: false,
          isLogedIn: true })
      );
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>

              <form onSubmit={this.onSubmit}>
                <h2>CREATE ACCOUNT </h2>
                <div className={classnames('form-group',
                  { 'has-error': errors.username })}>
                  <label className="control-label">User Name</label>
                  <input value={this.state.username} onChange={this.onChange}
                    type="text" name="username" className="form-control"
                    placeholder="eg:ibrahim" />
                  {errors.username && <span className="help-block">
                    {errors.username}
                  </span>}
                </div>
                <div className={classnames('form-group',
                  { 'has-error': errors.email })}>
                  <label className="control-label">Email</label>
                  <input value={this.state.emaii} onChange={this.onChange}
                    type="email" name="email" className="form-control"
                    placeholder="eg:abc@company.com" />
                  {errors.email && <span className="help-block">
                    {errors.email}
                  </span>}
                </div>
                <div className={classnames('form-group',
                  { 'has-error': errors.password })}>
                  <label className="control-label">Password</label>
                  <input value={this.state.password} onChange={this.onChange}
                    type="password" name="password" className="form-control"
                    placeholder="At least 6 Characters" />
                  {errors.password && <span className="help-block">
                    {errors.password}</span>}
                </div>
                <div className="form-group" >
                  <button disabled={this.state.isLoading} name="login"
                    className="btn btn-primary lgbotton col-md-offset-4-7">
                    <span className="glyphicon glyphicon-user" /> Signup
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div>
              <h3>Have an Account <Link to="/">Log In </Link></h3>
            </div>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}

SignUp.PropTypes = {
  SignUpAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};


export default SignUp;

