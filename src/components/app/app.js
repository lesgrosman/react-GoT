import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './button.css'
import CharacterPage from '../pages/characterPage'
import HousePage from '../pages/housePage'
import BookPage from '../pages/bookPage'
import BookItem from '../pages/bookItem'
import HouseItem from '../pages/houseItem'
import CharItem from '../pages/charItem'
import GotService from '../../services/gotService'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './app.css'


export default class App extends Component {

    state = {
        randomCharActive: true,
        error: false
    }

    gotService = new GotService()

    onToggleRandom = () => {
        this.setState({
            randomCharActive: !this.state.randomCharActive
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render(){
        const char = this.state.randomCharActive ? <RandomChar/> : null
        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-lg position"
                                    onClick={this.onToggleRandom}
                                    >
                                        Toggle Random Character 
                                </button>
                            </Col>
                        </Row>
                        <Route path='/characters' exact component={CharacterPage}/>
                        <Route path='/houses' exact component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                           ({match}) => {
                               const {id} = match.params
                            return <BookItem bookId={id}/>
                           }
                        }/>
                        <Route path='/characters/:id' render={
                           ({match}) => {
                               const {id} = match.params
                            return <CharItem charId={id}/>
                           }
                        }/>
                        <Route path='/houses/:id' render={
                           ({match}) => {
                               const {id} = match.params
                            return <HouseItem houseId={id}/>
                           }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }

    
};
