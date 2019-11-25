import React from 'react'
import {
  Input,
  CustomInput,
  FormGroup,
  Form,
  Row,
  Col,
  Button
} from 'reactstrap'
import img1 from '../../assets/images/logo-icon.png'
import img2 from '../../assets/images/background/login-register.jpg'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { PATH_ROUTER_PAGE_DEFAULT } from '../../constants/constants'
import { Notification } from '../../components/message/notification'

const sidebarBackground = {
  backgroundImage: 'url(' + img2 + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center'
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        username: '',
        password: ''
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errorMessage !== '') {
      Notification(
        'error',
        nextProps.auth.errorMessage.title,
        nextProps.auth.errorMessage.description
      )
    }
  }

  handleClick() {
    var elem = document.getElementById('loginform')
    elem.style.transition = 'all 2s ease-in-out'
    elem.style.display = 'none'
    document.getElementById('recoverform').style.display = 'block'
  }

  _handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.login()
    }
  }

  handleChange = fieldname => event => {
    const form = {
      ...this.state.form
    }
    form[fieldname] = event.target.value
    this.setState({ form })
  }

  login = () => {
    const { username, password } = this.state.form
    this.props.login(username, password)
  }

  verifyUserLogged = () => {
    if (this.props.auth.isAuth) {
      return <Redirect to={PATH_ROUTER_PAGE_DEFAULT} />
    }
  }

  render() {
    return (
      <div className="">
        {this.verifyUserLogged()}
        {/*--------------------------------------------------------------------------------*/}
        {/*Login Cards*/}
        {/*--------------------------------------------------------------------------------*/}
        <div
          className="auth-wrapper d-flex no-block justify-content-center align-items-center"
          style={sidebarBackground}>
          <div className="auth-box on-sidebar">
            <div id="loginform">
              <div className="logo">
                <span className="db">{/*<img src={img1} alt="logo" />*/}</span>
                <h5 className="font-medium mb-3">Cooperforte</h5>
              </div>
              <Row>
                <Col>
                  <Form className="mt-3" id="loginform" action="/dashbaord">
                    <FormGroup className="mb-3">
                      <Input
                        type="text"
                        placeholder="E-mail ou login"
                        name="username"
                        required
                        value={this.state.form.username}
                        autoFocus={true}
                        onKeyDown={this._handleKeyDown}
                        onChange={this.handleChange('username')}
                      />
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        value={this.state.form.password}
                        required
                        onKeyDown={this._handleKeyDown}
                        onChange={this.handleChange('password')}
                      />
                    </FormGroup>
                    {/*
                    <div className="d-flex no-block align-items-center mb-3">
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox"
                        label="Lembrar de mim"
                      />
                      <div className="ml-auto">
                        <a
                          href="#recoverform"
                          id="to-recover"
                          onClick={this.handleClick}
                          className="forgot text-dark float-right"
                        >
                          Esqueceu sua senha?
                        </a>
                      </div>
                    </div>
                    */}
                    <Row className="mb-3">
                      <Col>
                        <Button
                          color="info"
                          type="button"
                          block
                          onClick={this.login}
                          disabled={this.props.auth.isSigningin ? true : false}>
                          {!this.props.auth.isSigningin ? (
                            'Entrar'
                          ) : (
                            <Loader
                              type="Oval"
                              color="#ffffff"
                              height="20"
                              width="20"
                            />
                          )}
                        </Button>
                      </Col>
                    </Row>
                    {/*
                    <div className="text-center">
                      Não tem uma conta?
                      <a
                        href="/authentication/register"
                        className="text-info ml-1"
                      >
                        <b>Cadastre-se</b>
                      </a>
                    </div>
                     */}
                  </Form>
                </Col>
              </Row>
            </div>
            <div id="recoverform">
              <div className="logo">
                <span className="db">
                  <img src={img1} alt="logo" />
                </span>
                <h5 className="font-medium mb-3">Recover Password</h5>
                <span>
                  Enter your Email and instructions will be sent to you!
                </span>
              </div>
              <Row className="mt-3">
                <Col>
                  <Form action="/dashbaord">
                    <FormGroup>
                      <Input
                        type="text"
                        name="uname"
                        bsSize="lg"
                        id="Name"
                        placeholder="Username"
                        required
                      />
                    </FormGroup>
                    <Row className="mt-3">
                      <Col>
                        <Button color="danger" size="lg" type="submit" block>
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) =>
      dispatch(ActionCreators.signinRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
