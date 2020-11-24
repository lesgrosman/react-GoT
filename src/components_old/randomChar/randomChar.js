import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService'
import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage/errorMessage'


let Container = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;


const RandomTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const Property = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {

    componentDidMount() {
        this.updateRandomChar()
        this.timerId = setInterval(this.updateRandomChar, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId) 
    }

    gotService = new GotService()

    state = {
        char: {},
        loading: true,
        error: false
    }

    showRandomChar = char => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateRandomChar = () => {
        const id = Math.round(Math.random()*140 + 25) // 25 -140
        this.gotService.getCharacter(id)
            .then(char => this.showRandomChar(char))
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state

        const errorMessage = error ? <ErrorMessage/>: null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null

        return (
            <>               
                <Container className="rounded">
                    {errorMessage}
                    {spinner}
                    {content}
                </Container>          
            </>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char
    return (
        <>
            <RandomTitle>
                Random Character: {name}
            </RandomTitle>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Property>Gender</Property>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Property>Born</Property>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Property>Died</Property>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Property>Culture</Property>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )

}
