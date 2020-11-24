import React, {Component} from 'react'
import GotService from '../../services/gotService'
import ItemDetails, {Field} from '../itemDetails/itemDetails'

export default class CharItem extends Component {
    
    gotService = new GotService()

    render() {
        return (
            <ItemDetails
                itemId={this.props.charId}
                getData={this.gotService.getCharacter}
            >
                <Field field={'gender'} label={'Gender'}/>
                <Field field={'born'} label={'Born'}/>
                <Field field={'died'} label={'Died'}/>
                <Field field={'culture'} label={'Culture'}/>
            </ItemDetails>
        )
    }
}