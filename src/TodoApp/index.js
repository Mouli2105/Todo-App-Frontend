import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Redirect} from 'react-router'
import Home from './Home'
import Todo from './Todo'
import Profile from './Profile'

class TodoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseURL: 'http://ec2-13-233-74-98.ap-south-1.compute.amazonaws.com:8080'
            // baseURL: 'http://localhost:8080'
        }
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route
                        exact
                        path='/'
                        render={() => <Redirect to='/home' />}
                    />
                    <Route 
                        exact
                        path='/home'
                        render={() => <Home baseURL={this.state.baseURL} />}
                    />
                    <Route 
                        exact
                        path='/todo'
                        render={() => <Todo baseURL={this.state.baseURL} />}
                    />
                    <Route 
                        exact
                        path='/profile'
                        render={() => <Profile />}
                    />
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default TodoApp
