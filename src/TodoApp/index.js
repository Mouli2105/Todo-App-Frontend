import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Redirect} from 'react-router'
import Home from './Home'
import Todo from './Todo'
import Profile from './Profile'

class TodoApp extends Component {
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
                        component={Home}
                    />
                    <Route 
                        exact
                        path='/todo'
                        component={Todo}
                    />
                    <Route 
                        exact
                        path='/profile'
                        component={Profile}
                    />
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default TodoApp