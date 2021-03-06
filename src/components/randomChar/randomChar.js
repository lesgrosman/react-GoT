import React, {useState, useEffect} from 'react';
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

export default function RandomChar() {

    const [char, updateChar] = useState({})
    const [loading, setLoad] = useState(true)
    const [error, setError] = useState(false)

    const gotService = new GotService()


    useEffect(() => {
        updateRandomChar()
        let timerId = setInterval(updateRandomChar, 2000)

        return () => {
            clearInterval(timerId)
        } 
    }, [])

    function updateRandomChar() {
        const id = Math.round(Math.random()*140 + 25) // 25 -140
        gotService.getCharacter(id)
            .then(char => updateChar(char))
            .then(() => setLoad(false))
            .catch(() => setError(true))
    }

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
