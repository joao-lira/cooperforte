import React from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon,
  Table
} from 'reactstrap'
import classnames from 'classnames'
import { MiniCard } from '../../components/table/index.js'
import { Notification } from '../../components/message/notification'
import { ComponentHeader } from '../../components/component-header/component-header.js'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import api from '../../services/api'
import apiViaCep from '../../services/api-viacep'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import {
  defaultSorted,
  options,
  noDataMessage
} from '../../components/paginator/paginator.js'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask'

const { SearchBar, ClearSearchButton } = Search

class Clients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
      showModal: false,
      showObject: false,
      message: '',
      method: 'POST',
      form: {
        client_name: '',
        client_cpf: '',
        client_cep: '',
        client_logradouro: '',
        client_bairro: '',
        client_cidade: '',
        client_uf: '',
        client_complemento: '',
        st_registry_active: 'S',
        contacts: [
          {
            phone_number: '(61)36227-1580',
            contact_type: 'RE'
          }
        ],
        emails: [
          {
            email: 'joaopaullolyra@hotmail.com'
          }
        ]
      },
      contact: [],
      phone_number: '',
      mask: '',
      placeholder: '',
      disable_phone: true,
      email: [],
      email_address: '',
      clients: [],
      userLogged: this.props.auth.user,
      columns: [
        {
          dataField: 'st_registry_active',
          text: 'Status',
          headerStyle: { width: 20 },
          style: { width: 20 },
          sort: true,
          formatter: this.status
        },
        {
          dataField: 'client_name',
          text: 'Nome',
          headerStyle: { width: 100 },
          style: { width: 100 },
          sort: true,
          formatter: this.client
        },
        {
          dataField: 'created_formatted',
          text: 'Data de cadastro',
          headerStyle: { width: 40 },
          style: { width: 40 },
          sort: true
        },
        {
          dataField: 'modified_formatted',
          text: 'Última atualização',
          headerStyle: { width: 40 },
          style: { width: 40 },
          sort: true
        },
        {
          dataField: '2',
          text: this.props.auth.user.role === 'admin' && 'Ações',
          headerStyle: { width: 40 },
          style: { width: 40 },
          headerClasses: 'text-right',
          classes: 'text-right',
          formatter: this.props.auth.user.role === 'admin' && this.actions
        }
      ]
    }

    this.showModal = this.showModal.bind(this)
  }

  async componentDidMount() {
    await this.loadClients()
  }

  client(cell, row) {
    return (
      <div>
        <div className="font-weight-bold h4 m-0 p-0">{row.client_name}</div>
        <div>{`${row.client_logradouro}, ${row.client_bairro}, ${row.client_cidade}-${row.client_uf} - ${row.client_cep_formatted}, ${row.client_complemento}`}</div>
      </div>
    )
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
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
        <Button
          size="sm"
          color="info"
          outline
          onClick={() => this.handleEdit(row)}>
          <i className="ti-pencil" />
          {` Editar`}
        </Button>
        <Button
          className="ml-2"
          size="sm"
          color="info"
          outline
          onClick={() => this.delete(row.id)}>
          <i className="icon-trash" />
          {` Excluir`}
        </Button>
      </div>
    )
  }

  loadClients = async () => {
    try {
      const response = await api.get('clients')
      if (response.data.success) {
        this.setState({ clients: response.data.data.clients })
      } else {
        this.setState({ clients: [] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  showModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  clearStateFormClients = () => {
    this.setState({
      form: {
        client_name: '',
        client_cpf: '',
        client_cep: '',
        client_logradouro: '',
        client_bairro: '',
        client_cidade: '',
        client_uf: '',
        client_complemento: '',
        st_registry_active: 'S',
        contacts: [],
        emails: []
      }
    })
  }

  onRadioBtnClick(fieldname, value) {
    const form = { ...this.state.form }
    form[fieldname] = value
    this.setState({ form })
  }

  onRadioContactClick(fieldname, value) {
    let contact = { ...this.state.contact }
    let placeholder = ''
    let mask = '(99)9999-9999'
    let arr = []
    let item = {}
    item = {
      id: '',
      phone_number: '',
      contact_type: value,
      st_registry_active: 'S'
    }
    arr = arr.concat(item)
    contact = arr

    if (value === 'CO') {
      placeholder = 'Informe um número comercial'
    } else if (value === 'CE') {
      placeholder = 'Informe um celular'
      mask = '(99)99999-9999'
    } else if (value === 'RE') {
      placeholder = 'Informe um número residencial'
    } else {
      placeholder = 'Digite um número'
    }

    this.setState({
      contact: contact[0],
      phone_number: '',
      placeholder,
      mask,
      disable_phone: false
    })
  }

  handleChangeContacts = fieldname => event => {
    const contact = { ...this.state.contact }
    let item = {}
    item = {
      id: '',
      phone_number: event.target.value,
      phone_number_formatted: event.target.value,
      contact_type: contact.contact_type,
      st_registry_active: contact.st_registry_active
    }
    this.setState({
      contact: item,
      phone_number: event.target.value
    })
  }

  handleChangeEmails = fieldname => event => {
    const email = { ...this.state.email }
    let item = {}
    item = {
      id: '',
      email: event.target.value,
      st_registry_active: 'S'
    }
    this.setState({
      email: item,
      email_address: event.target.value
    })
  }

  handleAddContact = () => {
    const form = { ...this.state.form }
    const contact = { ...this.state.contact }
    let isValid = this.validatePhone(contact)
    if (isValid) {
      form.contacts = this.state.form.contacts.concat(contact)
      this.setState({ form })
      this.clearAddContact()
    }
  }

  validatePhone = contact => {
    let isValid = false
    if (contact.contact_type === 'CO') {
      if (contact.phone_number.length < 13) {
        Notification(
          'error',
          'Ooops!',
          'Informe o telefone comercial com 10 dígitos'
        )
      } else {
        isValid = true
      }
    } else if (contact.contact_type === 'CE') {
      if (contact.phone_number.length < 14) {
        Notification(
          'error',
          'Ooops!',
          'Informe o telefone celular com 11 dígitos'
        )
      } else {
        isValid = true
      }
    } else if (contact.contact_type === 'RE') {
      if (contact.phone_number.length < 13) {
        Notification(
          'error',
          'Ooops!',
          'Informe o telefone comercial com 10 dígitos'
        )
      } else {
        isValid = true
      }
    }
    return isValid
  }

  handleAddEmail = () => {
    const form = { ...this.state.form }
    const email = { ...this.state.email }
    form.emails = this.state.form.emails.concat(email)
    this.setState({ form })
    this.clearAddEmail()
  }

  handleDeleteContact = async index => {
    const form = { ...this.state.form }
    form.contacts.splice(index, 1)
    this.setState({ form })
  }

  handleDeleteEmail = async index => {
    const form = { ...this.state.form }
    form.emails.splice(index, 1)
    this.setState({ form })
  }

  clearAddEmail = () => {
    this.setState({
      email: [],
      email_address: ''
    })
  }

  clearAddContact = () => {
    this.setState({
      contact: [],
      phone_number: '',
      placeholder: '',
      mask: '',
      disable_phone: true
    })
  }

  handleChange = fieldname => event => {
    const form = { ...this.state.form }
    form[fieldname] = event.target.value
    this.setState({ form })
  }

  getDataFromViaCep = async cep => {
    if (cep.length == 10) {
      cep = cep.replace('.', '').replace('-', '')
      const form = { ...this.state.form }
      const response = await apiViaCep.get(`${cep}/json`)
      if (!response.data.erro) {
        form['client_logradouro'] = response.data.logradouro
        form['client_bairro'] = response.data.bairro
        form['client_cidade'] = response.data.localidade
        form['client_uf'] = response.data.uf
        this.setState({ form })
      }
    }
  }

  showObject = () => {
    this.setState({ showObject: !this.state.showObject })
  }

  delete(id) {
    api.delete(`clients/${id}`).then(response => {
      if (response.data.success) {
        this.loadClients()
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

  handleEdit(c) {
    console.log(c)
    this.setState({
      showModal: !this.state.showModal,
      method: 'PUT',
      form: {
        id: c.id,
        client_name: c.client_name,
        client_cpf: c.client_cpf_formatted,
        client_cep: c.client_cep_formatted,
        client_logradouro: c.client_logradouro,
        client_bairro: c.client_bairro,
        client_cidade: c.client_cidade,
        client_uf: c.client_uf,
        client_complemento: c.client_complemento,
        st_registry_active: c.st_registry_active,
        contacts: c.contacts,
        emails: c.emails
      }
    })
  }

  clearState = () => {
    this.clearStateFormClients()
    this.clearAddContact()
    this.clearAddEmail()
  }

  handleSendData = async () => {
    const { method } = this.state
    const form = { ...this.state.form }
    let isValid = this.validateData(form)
    if (isValid) {
      try {
        const response =
          method === 'POST'
            ? await api.post('clients', {
                client_name: form.client_name,
                client_cpf: form.client_cpf,
                client_cep: form.client_cep,
                client_logradouro: form.client_logradouro,
                client_bairro: form.client_bairro,
                client_cidade: form.client_cidade,
                client_uf: form.client_uf,
                client_complemento: form.client_complemento,
                st_registry_active: form.st_registry_active,
                contacts: form.contacts,
                emails: form.emails
              })
            : await api.put('clients', {
                id: form.id,
                client_name: form.client_name,
                client_cpf: form.client_cpf,
                client_cep: form.client_cep,
                client_logradouro: form.client_logradouro,
                client_bairro: form.client_bairro,
                client_cidade: form.client_cidade,
                client_uf: form.client_uf,
                client_complemento: form.client_complemento,
                st_registry_active: form.st_registry_active,
                contacts: form.contacts,
                emails: form.emails
              })
        if (response.data.success) {
          Notification(
            'success',
            response.data.message.title,
            response.data.message.description
          )
          this.loadClients()
          this.setState({ showModal: false })
        } else {
          Notification(
            'error',
            response.data.message.title,
            response.data.message.description
          )
        }
      } catch (error) {
        Notification(
          'error',
          'Ooops!',
          'Aconteceu algum problema interno. Por favor, tente novamente.'
        )
      }
    }
  }

  validateData = form => {
    let isValid = false
    if (form.client_name === '') {
      Notification('error', 'Ooops!', 'O nome é obrigatório')
      this.toggle('1')
      return isValid
    } else if (form.client_name.length < 3) {
      Notification(
        'error',
        'Ooops!',
        'O nome precisa ter ao menos 3 caracteres'
      )
      this.toggle('1')
      return isValid
    } else if (form.client_cpf === '') {
      Notification('error', 'Ooops!', 'Informe o CPF')
      this.toggle('1')
      return isValid
    } else if (form.client_cpf.length < 14) {
      Notification('error', 'Ooops!', 'Informe o CPF com 11 dígitos')
      this.toggle('1')
      return isValid
    } else if (form.client_cep === '') {
      Notification('error', 'Ooops!', 'Informe o CEP')
      this.toggle('1')
      return isValid
    } else if (form.client_cep.length < 8) {
      Notification('error', 'Ooops!', 'Informe o CEP com 8 dígitos')
      this.toggle('1')
      return isValid
    } else if (form.client_logradouro === '') {
      Notification('error', 'Ooops!', 'Informe o logradouro')
      this.toggle('1')
      return isValid
    } else if (form.client_bairro === '') {
      Notification('error', 'Ooops!', 'Informe o bairro')
      this.toggle('1')
      return isValid
    } else if (form.client_cidade === '') {
      Notification('error', 'Ooops!', 'Informe a cidade')
      this.toggle('1')
      return isValid
    } else if (form.client_uf === '') {
      Notification('error', 'Ooops!', 'Informe a UF')
      this.toggle('1')
      return isValid
    } else if (form.contacts.length === 0) {
      Notification('error', 'Ooops!', 'Informe ao menos um contato telefônico')
      this.toggle('2')
      return isValid
    } else if (form.emails.length === 0) {
      Notification('error', 'Ooops!', 'Informe ao menos um e-mail')
      this.toggle('3')
      return isValid
    } else {
      isValid = true
    }
    return isValid
  }

  render() {
    const {
      client_name,
      client_cpf,
      client_cep,
      client_logradouro,
      client_bairro,
      client_cidade,
      client_uf,
      client_complemento,
      st_registry_active
    } = this.state.form
    const {
      phone_number,
      mask,
      placeholder,
      disable_phone,
      email_address,
      userLogged,
      method
    } = this.state
    return (
      <div>
        <Modal
          isOpen={this.state.showModal}
          fade={false}
          size="md"
          toggle={this.showModal}
          className={this.props.className}
          onOpened={() => this.toggle('1')}
          onClosed={() => this.clearState()}>
          <ModalHeader toggle={this.showModal}>Novo cliente</ModalHeader>
          <ModalBody>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === '1'
                    })}
                    onClick={() => {
                      this.toggle('1')
                    }}>
                    Dados pessoais
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === '2'
                    })}
                    onClick={() => {
                      this.toggle('2')
                    }}>
                    Contatos telefônicos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === '3'
                    })}
                    onClick={() => {
                      this.toggle('3')
                    }}>
                    E-mails
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="mt-3">
                    <FormGroup>
                      <Row>
                        <Label sm="4">Cliente ativo?</Label>
                        <Col sm="8">
                          <Button
                            size="sm"
                            color={
                              st_registry_active === 'S' ? 'info' : 'default'
                            }
                            onClick={() =>
                              this.onRadioBtnClick('st_registry_active', 'S')
                            }
                            className={
                              st_registry_active === 'S' ? '' : 'disabled'
                            }
                            active={st_registry_active === 'S'}>
                            Sim
                          </Button>
                          <Button
                            size="sm"
                            color={
                              st_registry_active === 'N' ? 'info' : 'default'
                            }
                            onClick={() =>
                              this.onRadioBtnClick('st_registry_active', 'N')
                            }
                            className={
                              st_registry_active === 'N' ? '' : 'disabled'
                            }
                            active={st_registry_active === 'N'}>
                            Não
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">Nome</Label>
                        <Col sm="8">
                          <Input
                            type="text"
                            maxLength="100"
                            value={client_name}
                            onChange={this.handleChange('client_name')}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">CPF</Label>
                        <Col sm="8">
                          <InputMask
                            className="form-control"
                            mask="999.999.999-99"
                            maskChar=""
                            value={client_cpf}
                            onChange={this.handleChange('client_cpf')}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">CEP</Label>
                        <Col sm="8">
                          <InputMask
                            className="form-control"
                            mask="99.999-999"
                            maskChar=""
                            value={client_cep}
                            onChange={this.handleChange('client_cep')}
                            onBlur={() => this.getDataFromViaCep(client_cep)}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">Logradouro</Label>
                        <Col sm="8">
                          <Input
                            type="text"
                            value={client_logradouro}
                            onChange={this.handleChange('client_logradouro')}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">Bairro</Label>
                        <Col sm="8">
                          <Input
                            type="text"
                            value={client_bairro}
                            onChange={this.handleChange('client_bairro')}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">Cidade</Label>
                        <Col sm="8">
                          <Input
                            type="text"
                            value={client_cidade}
                            onChange={this.handleChange('client_cidade')}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">UF</Label>
                        <Col sm="8">
                          <Input
                            type="text"
                            value={client_uf}
                            onChange={this.handleChange('client_uf')}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">Complemento</Label>
                        <Col sm="8">
                          <Input
                            type="textarea"
                            value={client_complemento}
                            onChange={this.handleChange('client_complemento')}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="mt-3">
                    <FormGroup>
                      <Row>
                        <Label sm="4">Escolha o tipo</Label>
                        <Col sm="8">
                          <Button
                            size="sm"
                            color={
                              this.state.contact.contact_type === 'CO'
                                ? 'info'
                                : 'default'
                            }
                            onClick={() =>
                              this.onRadioContactClick('contacts', 'CO')
                            }
                            className={
                              this.state.contact.contact_type === 'CO'
                                ? ''
                                : 'disabled'
                            }
                            active={this.state.contact.contact_type === 'CO'}>
                            Comercial
                          </Button>
                          <Button
                            size="sm"
                            color={
                              this.state.contact.contact_type === 'CE'
                                ? 'info'
                                : 'default'
                            }
                            onClick={() =>
                              this.onRadioContactClick('contacts', 'CE')
                            }
                            className={
                              this.state.contact.contact_type === 'CE'
                                ? ''
                                : 'disabled'
                            }
                            active={this.state.contact.contact_type === 'CE'}>
                            Celular
                          </Button>
                          <Button
                            size="sm"
                            color={
                              this.state.contact.contact_type === 'RE'
                                ? 'info'
                                : 'default'
                            }
                            onClick={() =>
                              this.onRadioContactClick('contacts', 'RE')
                            }
                            className={
                              this.state.contact.contact_type === 'RE'
                                ? ''
                                : 'disabled'
                            }
                            active={this.state.contact.contact_type === 'RE'}>
                            Residencial
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Label sm="4">Digite o número</Label>
                        <Col sm="8">
                          <InputGroup>
                            <InputMask
                              type="phone_number"
                              className="form-control"
                              placeholder={placeholder}
                              mask={mask}
                              disabled={disable_phone}
                              maskChar=""
                              value={phone_number}
                              onChange={this.handleChangeContacts(
                                'phone_number'
                              )}
                            />
                            <InputGroupAddon addonType="append">
                              <Button
                                className="btn btn-info"
                                disabled={disable_phone}
                                onClick={() => this.handleAddContact()}>
                                Incluir
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col sm="12">
                          <Table hover responsive size="sm">
                            <tbody>
                              {this.state.form.contacts.map((contact, key) => (
                                <tr key={key}>
                                  <td>
                                    {contact.contact_type === 'CO'
                                      ? 'Telefone comercial'
                                      : contact.contact_type === 'CE'
                                      ? 'Telefone celular'
                                      : 'Telefone residencial'}
                                  </td>
                                  <td>
                                    {method === 'POST'
                                      ? contact.phone_number
                                      : contact.phone_number_formatted}
                                  </td>
                                  <td className="text-right">
                                    <Button
                                      size="sm"
                                      color="info"
                                      outline
                                      onClick={() =>
                                        this.handleDeleteContact(key)
                                      }>
                                      Excluir
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </FormGroup>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="mt-3">
                    <FormGroup>
                      <Row>
                        <Label sm="4">E-mail</Label>
                        <Col sm="8">
                          <InputGroup>
                            <Input
                              type="text"
                              value={email_address}
                              onChange={this.handleChangeEmails(
                                'email_address'
                              )}
                            />
                            <InputGroupAddon addonType="append">
                              <Button
                                className="btn btn-info"
                                onClick={() => this.handleAddEmail()}>
                                Incluir
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col sm="12">
                          <Table hover responsive size="sm">
                            <tbody>
                              {this.state.form.emails.map((email, key) => (
                                <tr key={key}>
                                  <td>{email.email}</td>
                                  <td className="text-right">
                                    <Button
                                      size="sm"
                                      color="info"
                                      outline
                                      onClick={() =>
                                        this.handleDeleteEmail(key)
                                      }>
                                      Excluir
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </FormGroup>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="info" outline onClick={this.showModal}>
              Fechar
            </Button>
            <Button
              color="info"
              type="buttom"
              onClick={() => this.handleSendData()}>
              Salvar
            </Button>
          </ModalFooter>
          {this.state.showObject ? (
            <div className="p-4">
              <strong>State DADOS PESSOAIS</strong>
              <pre>{JSON.stringify(this.state.form, undefined, 1)}</pre>
              <strong>State CONTATOS TELEFÔNICOS</strong>
              <pre>{JSON.stringify(this.state.contact, undefined, 1)}</pre>
              <strong>State EMAILS</strong>
              <pre>{JSON.stringify(this.state.email, undefined, 1)}</pre>
              <strong>STATE</strong>
              <pre>{JSON.stringify(this.state.clients, undefined, 1)}</pre>
              <div className="text-center">
                <Button
                  color="info"
                  outline
                  type="buttom"
                  onClick={() => this.showObject()}>
                  Esconder state
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <Button
                color="info"
                outline
                type="buttom"
                onClick={() => this.showObject()}>
                Exibir state
              </Button>
            </div>
          )}
        </Modal>
        {this.state.clients.length === 0 ? (
          <ComponentHeader
            title="Nenhum registro cadastrado"
            description="Cadastre o seu primeiro item"
            onClick={this.showModal}
            btnLabel="Novo"
          />
        ) : (
          <Row>
            <Col sm="12" className="text-center mb-3 empty">
              {userLogged.role === 'admin' && (
                <Button
                  className={'btn-circle text-white btn btn-info'}
                  onClick={this.showModal}>
                  <i className={'text-white ti-plus'} />
                </Button>
              )}
            </Col>
            <Col sm="12" md="2" lg="2" xl="2">
              <h3>Resumos</h3>
              <MiniCard
                icon="ti-shopping-cart"
                title="Total de clientes"
                description={this.state.clients.length}
              />
            </Col>
            <Col sm="12" md="10" lg="10" xl="10">
              <Row>
                <Col md="12">
                  <h3>Clientes</h3>
                  <Card>
                    <div className="p-3">
                      <ToolkitProvider
                        keyField="id"
                        data={this.state.clients}
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
                              keyField="id"
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
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(Clients)
