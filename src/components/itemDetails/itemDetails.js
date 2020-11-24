import React, {useState, useEffect} from 'react';
import './itemDetails.css';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const CharTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const Property = styled.span`
    font-weight: bold;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <Property>{label}</Property>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}

export default function ItemDetails(props) {

    const [item, itemUpdate] = useState({})

    useEffect(() => {
        updateItem()
    })

    function updateItem() {
        if (!props.itemId) {
            return
        }
       
        props.getData(props.itemId)
            .then(item => {
                itemUpdate(item)
            })  
    }
    
    if (!props.itemId) {
        return <span className="select-error">Please select character</span>
    }

    const {name} = item

    return (
        <Container className="rounded">
            <CharTitle>
                {name}
            </CharTitle>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </Container>
    );
    
}

