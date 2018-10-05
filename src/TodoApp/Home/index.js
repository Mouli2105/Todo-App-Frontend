import React, {Component} from 'react'
import {
    Container,
    Jumbotron,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Col,
    Label,
    Input,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Modal,
    ModalBody
} from 'reactstrap'
import './style.css'
import {withRouter} from 'react-router'
import classnames from 'classnames'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1',
            username: '',
            password: '',
            email: '',
            alertOpen: false,
        }
        this.toggleTab = this.toggleTab.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.toggleAlert = this.toggleAlert.bind(this)
    }

    componentDidMount() {
        var id = localStorage.getItem('todo-app-user-id')
        if (id) {
            this.props.history.push('/todo')
        }
    }

    toggleTab(tab) {
        this.setState({
            activeTab: tab
        })
    }

    toggleAlert() {
        this.setState(prev => ({
            alertOpen: !prev.alertOpen
        }))
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login(e) {
        e.preventDefault()
        fetch(`${this.props.baseURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('todo-app-user-id', json.id)
            localStorage.setItem('todo-app-user-username', json.username)
            console.log('Login success!!')
            this.props.history.push('/todo')
        })
        .catch(err => {
            this.setState({
                alertOpen: true,
                alertMessage: 'Invalid Credentials Provided!!'
            })
        })
    }

    register(e) {
        e.preventDefault()
        fetch(`${this.props.baseURL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('todo-app-user-id', json.id)
            localStorage.setItem('todo-app-user-username', json.username)
            console.log('Register success!!')
            this.props.history.push('/todo')
        })
        .catch(err => { 
            this.setState({
                alertOpen: true,
                alertMessage: 'Invalid or Repeated Credentials Provided!!'
            })
        })
    }


    render() {
        return (
            <Container>
                <Jumbotron className='text-center'>
                    <h1 className='display-1'>
                        TODO
                    </h1>
                    <h3 className='display-3'>
                        APP
                    </h3>
                    <hr />
                    <center>
                        <Card className='user-board'>
                            <CardHeader>
                                <Nav tabs>
                                    <NavItem className='mouse-pointer'>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1'})}
                                            onClick={() => this.toggleTab('1')}
                                            >
                                            LOGIN
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className='mouse-pointer'>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => this.toggleTab('2')}
                                            >
                                            REGISTER
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </CardHeader>
                            <CardBody>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId='1'>
                                        <Form>
                                            <FormGroup row>
                                                <Label sm={4}>Username</Label>
                                                <Col sm={8}>
                                                    <Input 
                                                        required
                                                        type='text'
                                                        name='username'
                                                        placeholder='Ironman'
                                                        value={this.state.username}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm={4}>Password</Label>
                                                <Col sm={8}>
                                                    <Input 
                                                        required
                                                        type='password'
                                                        name='password'
                                                        placeholder='xxWarMachinexx'
                                                        value={this.state.password}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={12}>
                                                    <Button
                                                        color='success'
                                                        onClick={this.login}
                                                        >
                                                        LOGIN
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>    
                                    </TabPane>
                                    <TabPane tabId='2'>
                                        <Form>
                                            <FormGroup row>
                                                <Label sm={4}>Username</Label>
                                                <Col sm={8}>
                                                    <Input 
                                                        type='text'
                                                        name='username'
                                                        placeholder='Ironman'
                                                        value={this.state.username}
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm={4}>Email</Label>
                                                <Col sm={8}>
                                                    <Input 
                                                        type='email'
                                                        name='email'
                                                        placeholder='tony@starkltd.com'
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm={4}>Password</Label>
                                                <Col sm={8}>
                                                    <Input 
                                                        type='password'
                                                        name='password'
                                                        placeholder='xxWarMachinexx'
                                                        value={this.state.password}
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={12}>
                                                    <Button
                                                        color='success'
                                                        onClick={this.register}
                                                        >
                                                        REGISTER
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>    
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>           
                    </center>
                    <Modal 
                        isOpen={this.state.alertOpen}
                        toggle={this.toggleAlert}
                        >
                        <ModalBody>
                            {this.state.alertMessage}
                        </ModalBody>
                    </Modal>
                </Jumbotron>
            </Container>
        )
    }
}

export default withRouter(Home)