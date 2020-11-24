import React, {Component} from 'react'
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage/errorMessage'
import GotService from '../../services/gotService'
import {withRouter} from 'react-router-dom'

class HousePage extends Component{

    state ={
        error: false
    }

    gotService = new GotService()


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => name}
            />
        )
    }
}

export default withRouter(HousePage)