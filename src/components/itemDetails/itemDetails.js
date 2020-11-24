import React, {Component} from 'react';
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

export default class ItemDetails extends Component {

    state ={
        item: {}
    }

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem()
        }       
    }

    updateItem() {
        const {getData, itemId} = this.props
        if (!itemId) {
            return
        }
       
        getData(itemId)
            .then(item => {
                this.setState({item})
            })  
    }



    render() {
        if (!this.props.itemId) {

            return <span className="select-error">Please select character</span>

        }

        const {name} = this.state.item
        const {item} = this.state

        return (
            <Container className="rounded">
                <CharTitle>
                    {name}
                </CharTitle>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </Container>
        );
    }
}