import React, {Component} from 'react'
import {
    Container,
    Card,
    ListGroup,
    ListGroupItem,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Jumbotron
} from 'reactstrap'
import './style.css'

class TodoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_task: '',
            tasks: [],
            modal_open: false,
            user_id: 0,
            username: ''
        }
        this.update_new_task = this.update_new_task.bind(this)
        this.add_task = this.add_task.bind(this)
        this.remove_task = this.remove_task.bind(this)
        this.toggle_modal = this.toggle_modal.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        var id = localStorage.getItem('todo-app-user-id')
        var username = localStorage.getItem('todo-app-user-username')
        if (id) {
            this.fetch_tasks(id, username)
        }
        else {
            this.props.history.push('/home')
        }
    }

    componentWillReceiveProps(nextProps) {
        var id = localStorage.getItem('todo-app-user-id')
        var username = localStorage.getItem('todo-app-user-username')
        if (id) {
            this.fetch_tasks(id, username)
        }
        else {
            this.props.history.push('/home')
        }
    }

    fetch_tasks(id, username) {
        fetch(`http://localhost:8080/api/tasks/?user=${id}`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                tasks: json,
                user_id: id,
                username: username
            })
        })
        .catch(err => console.log(err))
    }

    update_new_task(e) {
        this.setState({
            new_task: e.target.value
        })
    }

    add_task() {
        if (this.state.new_task.length !== 0) {
            fetch(`http://localhost:8080/api/tasks/?user=${this.state.user_id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: this.state.new_task
                })
            })
            .then(data => data.json())
            .then(json => {
                console.log('new task added: ', json)
                this.setState(prev => ({
                    new_task: '',
                    tasks: prev.tasks.concat(json)
                }))
            })
        }
    }

    remove_task(id) {
        fetch(`http://localhost:8080/api/tasks/${id}`, {
            method: 'DELETE',
        })
        .then(data => data.json())
        .then(json => {
            this.setState(prev => ({
                tasks: prev.tasks.filter(task => task.id !== json.id)
            }))
        })
        .catch(err => console.log(err))
    }

    toggle_modal() {
        this.setState(prev => ({
            modal_open: !prev.modal_open
        }))
    }

    logout() {
        localStorage.removeItem('todo-app-user-id')
        localStorage.removeItem('todo-app-user-username')
        this.setState({
            user_id: 0,
            username: ''
        })
        this.props.history.push('/home')
    }

    render() {
        return (
            <Container>
                <Jumbotron className='text-center my-navbar'>
                    <h2 className='display-2'>TODO</h2>
                    <h4 className='display-4'>APP</h4>
                    <div className='my-navbar-user-section'>
                        <a 
                            href='#__wait-for-it__'
                            >
                            {this.state.username}
                        </a>
                        <hr />
                        <Button
                            color='danger'
                            onClick={this.logout}
                            >
                            LOGOUT
                        </Button>
                    </div>
                </Jumbotron>
                <hr />
                <Card className='todo-list'>
                    <ListGroup flush>
                        <ListGroupItem>
                            <InputGroup>
                                <Input 
                                    type='text'
                                    value={this.state.new_task}
                                    onChange={this.update_new_task}
                                    placeholder="Add your task here..."
                                />
                                <InputGroupAddon addonType='append'>
                                    <Button
                                        color='primary'
                                        onClick={this.add_task}
                                        >
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                            </ListGroupItem>
                            {this.state.tasks.map((t) => {
                                return (
                                    <ListGroupItem 
                                        key={t.id}
                                        className='item'
                                        >
                                        {t.content}
                                        <div
                                            className='icon'
                                            onClick={() => this.remove_task(t.id)}
                                            >
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </div>
                                    </ListGroupItem>
                                )
                            })}
                    </ListGroup>
                </Card>
            </Container>
        )
    }
}

export default TodoApp;