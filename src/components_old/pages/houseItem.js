import React, {Component} from 'react'
import GotService from '../../services/gotService'
import ItemDetails, {Field} from '../itemDetails/itemDetails'

export default class HouseItem extends Component {
    
    gotService = new GotService()

    render() {
        return (
            <ItemDetails
                itemId={this.props.houseId}
                getData={this.gotService.getHouse}
            >
                 <Field field={'name'} label={'Name'}/>
                <Field field={'region'} label={'Region'}/>
            </ItemDetails>
        )
    }
}