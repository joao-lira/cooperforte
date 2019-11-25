import React from 'react'
import { Link } from 'react-router-dom'

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Badge,
  CustomInput
} from 'reactstrap'

import { MiniCard } from '../../components/table/index.js'
import { Notification } from '../../components/message/notification'
import api from '../../services/api'
import { ComponentHeader } from '../../components/component-header/component-header.js'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import {
  defaultSorted,
  options,
  noDataMessage
} from '../../components/paginator/paginator.js'

const { SearchBar, ClearSearchButton } = Search

class Users extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      method: 'add',
      users: [],
      roles: [],
      id: '',
      user_avatar: '',
      user_username: '',
      user_email: '',
      user_cpf: '',
      user_rg: '',
      user_password: '',
      profile_id: '',
      st_registry_active: 'S',
      columns: [
        {
          dataField: 'st_registry_active',
          text: 'Status',
          headerStyle: { width: 55 },
          style: { width: 55 },
          sort: true,
          formatter: this.status
        },
        {
          dataField: 'user_avatar',
          text: 'Foto',
          headerStyle: { width: 55 },
          style: { width: 55 },
          sort: true,
          formatter: this.avatar
        },
        {
          dataField: 'user_username',
          text: 'Nome',
          headerStyle: { width: 150 },
          style: { width: 150 },
          sort: true,
          formatter: this.user
        },

        {
          dataField: 'user_cpf',
          text: 'CPF',
          headerStyle: { width: 100 },
          style: { width: 100 },
          sort: true
        },
        {
          dataField: 'user_rg',
          text: 'RG',
          headerStyle: { width: 100 },
          style: { width: 100 },
          sort: true
        },
        {
          dataField: '1',
          text: 'Perfil',
          headerStyle: { width: 100 },
          style: { width: 100 },
          sort: true,
          formatter: this.profile
        },
        {
          dataField: 'created',
          text: 'Datas',
          headerStyle: { width: 100 },
          style: { width: 100 },
          sort: true,
          formatter: this.dates
        },
        {
          dataField: '2',
          text: 'Ações',
          headerStyle: { width: 50 },
          style: { width: 50 },
          headerClasses: 'text-right',
          classes: 'text-right',
          formatter: this.actions
        }
      ]
    }

    this.showModal = this.showModal.bind(this)
  }

  componentDidMount() {
    this.loadUsers()
    this.getRoles()
  }

  avatar(cell, row) {
    return (
      <img
        className="rounded-circle"
        src={row.user_avatar}
        alt="user"
        width="30"
        height="30"
      />
    )
  }

  user(cell, row) {
    return (
      <div>
        <div>{row.user_username}</div>
        <small>{row.user_email}</small>
      </div>
    )
  }

  status(cell, row) {
    return (
      <div>
        {cell === 'S' && (
          <Badge color="info" className="text-white" pill>
            Ativo
          </Badge>
        )}
        {cell === 'N' && (
          <Badge color="secondary" pill>
            Inativo
          </Badge>
        )}
      </div>
    )
  }

  actions = (cell, row) => {
    return (
      <div>
        <span className="link mr-2" onClick={this.handleEdit.bind(this, row)}>
          <i className="ti-pencil" />
        </span>
        <a
          href="javascript:void(0)"
          className="link mr-2"
          onClick={this.delete.bind(this, row.id)}>
          <i className="icon-trash" />
        </a>
      </div>
    )
  }

  dates = (cell, row) => {
    return (
      <span className="p-0 m-0">
        <small>
          <i className="ti-star" /> {row.created}
        </small>
        <br />
        <small>
          <i className="ti-reload" /> {row.modified}
        </small>
      </span>
    )
  }

  profile = (cell, row) => {
    return (
      <Badge color="info" className="text-white" pill>
        Administrador
      </Badge>
    )
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  loadUsers() {
    api.get('users').then(res => {
      const users = res.data.data.users
      this.setState({
        users
      })
    })
  }

  getRoles() {
    api.get('roles').then(res => {
      const roles = res.data.data.roles
      this.setState({
        roles
      })
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const {
      id,
      user_avatar,
      user_username,
      user_email,
      user_cpf,
      user_rg,
      user_password,
      profile_id,
      st_registry_active
    } = this.state

    if (this.state.method === 'add') {
      api
        .post('users', {
          id,
          user_avatar,
          user_username,
          user_email,
          user_cpf,
          user_rg,
          user_password,
          profile_id: 1,
          st_registry_active
        })
        .then(response => {
          if (response.data.success) {
            this.setState({ showModal: false })
            this.loadUsers()
            Notification(
              'success',
              response.data.message.title,
              response.data.message.description
            )
          } else {
            Notification(
              'error',
              response.data.message.title,
              response.data.message.description
            )
          }
        })
    } else {
      api
        .put('users', {
          id,
          user_avatar,
          user_username,
          user_email,
          user_cpf,
          user_rg,
          user_password,
          profile_id: 1,
          st_registry_active
        })
        .then(response => {
          if (response.data.success) {
            this.setState({ showModal: false })
            this.loadUsers()
            Notification(
              'success',
              response.data.message.title,
              response.data.message.description
            )
          } else {
            Notification(
              'error',
              response.data.message.title,
              response.data.message.description
            )
          }
        })
    }
  }

  delete(id) {
    api.delete(`users/${id}`).then(response => {
      if (response.data.success) {
        this.loadUsers()
        Notification(
          'success',
          response.data.message.title,
          response.data.message.description
        )
      } else {
        Notification(
          'error',
          response.data.message.title,
          response.data.message.description
        )
      }
    })
  }

  onRadioBtnClick(st_registry_active) {
    this.setState({ st_registry_active })
  }

  showModal() {
    this.setState({
      showModal: !this.state.showModal,
      method: 'add',
      id: '',
      user_avatar: '',
      user_username: '',
      user_email: '',
      user_cpf: '',
      user_rg: '',
      user_password: '',
      profile_id: '',
      st_registry_active: 'S'
    })
  }

  handleEdit(u) {
    this.setState({
      showModal: !this.state.showModal,
      method: 'edit',
      id: u.id,
      user_avatar: u.user_avatar,
      user_username: u.user_username,
      user_email: u.user_email,
      user_cpf: u.user_cpf,
      user_rg: u.user_rg,
      user_password: u.user_password,
      profile_id: u.profile_id,
      st_registry_active: u.st_registry_active
    })
  }

  render() {
    const {
      id,
      user_avatar,
      user_username,
      user_email,
      user_cpf,
      user_rg,
      user_password,
      st_registry_active
    } = this.state
    return (
      <div>
        <div className="text-center mb-3 empty">
          <Button
            className={'btn-circle text-white btn btn-info'}
            onClick={this.showModal}>
            <i className={'text-white ti-plus'} />
          </Button>
        </div>
        <Row>
          <Col sm="12" md="2" lg="2" xl="2">
            <h3>Resumos</h3>
            <MiniCard
              icon="ti-shopping-cart"
              title="Total de usuários"
              description={this.state.users.length}
            />
          </Col>
          <Col sm="12" md="10" lg="10" xl="10">
            <Modal
              isOpen={this.state.showModal}
              fade={false}
              size="lg"
              toggle={this.showModal}
              className={this.props.className}>
              <ModalHeader toggle={this.showModal}>Novo usuário</ModalHeader>
              <ModalBody>
                <Form>
                  <Input
                    type="hidden"
                    name="id"
                    value={id}
                    onChange={this.onChange}
                  />

                  <Row>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="product-image">Usuário ativo?</Label>
                        <br />
                        <Button
                          size="sm"
                          color={
                            this.state.st_registry_active === 'S'
                              ? 'info'
                              : 'default'
                          }
                          onClick={() => this.onRadioBtnClick('S')}
                          className={
                            this.state.st_registry_active === 'S'
                              ? ''
                              : 'disabled'
                          }
                          active={this.state.st_registry_active === 'S'}>
                          Sim
                        </Button>
                        <Button
                          size="sm"
                          color={
                            this.state.st_registry_active === 'N'
                              ? 'info'
                              : 'default'
                          }
                          onClick={() => this.onRadioBtnClick('N')}
                          className={
                            this.state.st_registry_active === 'N'
                              ? ''
                              : 'disabled'
                          }
                          active={this.state.st_registry_active === 'N'}>
                          Não
                        </Button>
                        <Input
                          type="hidden"
                          name="st_registry_active"
                          value={st_registry_active}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="user-image">Perfil</Label>
                        <Input
                          type="text"
                          name="user_avatar"
                          id="user-image"
                          value={user_avatar}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="user-username">Nome</Label>
                        <Input
                          type="text"
                          name="user_username"
                          id="user-username"
                          value={user_username}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="user-email">E-mail</Label>
                        <Input
                          type="email"
                          name="user_email"
                          id="user-email"
                          value={user_email}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="user-cpf">CPF</Label>
                        <Input
                          type="text"
                          name="user_cpf"
                          id="user-cpf"
                          value={user_cpf}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="user-rg">RG</Label>
                        <Input
                          type="text"
                          name="user_rg"
                          id="user-rg"
                          value={user_rg}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="user-password">Senha</Label>
                        <Input
                          type="password"
                          name="user_password"
                          id="user-password"
                          value={user_password}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="4" lg="4" xl="4">
                      <FormGroup>
                        <Label htmlFor="profile-id">Perfil</Label>
                        {this.state.roles.map((r, key) => (
                          <CustomInput
                            key={r.id}
                            type="checkbox"
                            name="profile_id[]"
                            id={`role-${r.id}`}
                            label={r.role_name}
                            value={r.id}
                            onChange={this.onChange}
                          />
                        ))}
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="info" outline onClick={this.showModal}>
                  Cancelar
                </Button>
                <Button color="info" type="submit" onClick={this.onSubmit}>
                  Salvar
                </Button>
              </ModalFooter>
            </Modal>

            {this.state.users.length === 0 ? (
              <ComponentHeader
                title="Nenhum registro cadastrado"
                description="Cadastre o seu primeiro item"
                onClick={this.showModal}
                btnLabel="Novo"
              />
            ) : (
              <Row>
                <Col md="12">
                  <h3>Usuários</h3>
                  <Card>
                    <div className="p-3">
                      <ToolkitProvider
                        keyField="id"
                        data={this.state.users}
                        columns={this.state.columns}
                        search>
                        {props => (
                          <div>
                            <Row>
                              <Col md="12">
                                <SearchBar
                                  {...props.searchProps}
                                  placeholder="Pesquisar..."
                                />
                                <ClearSearchButton
                                  className="btn-info btn-sm"
                                  text="Limpar"
                                  {...props.searchProps}
                                />
                              </Col>
                            </Row>
                            <BootstrapTable
                              {...props.baseProps}
                              pagination={paginationFactory(options)}
                              defaultSorted={defaultSorted}
                              bordered={false}
                              hover
                              classes="table-sm mt-3"
                              wrapperClasses="table-responsive"
                              noDataIndication={noDataMessage}
                            />
                          </div>
                        )}
                      </ToolkitProvider>
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users
