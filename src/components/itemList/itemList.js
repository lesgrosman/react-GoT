import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner/spinner'


function ItemList({getData, renderItem, onItemSelected}) {

    const [itemList, updateList] = useState([])

    useEffect(() => {
        getData()
            .then( (data) => {
                updateList(data)
            })
    }, [])

    function renderList(arr) {
        return arr.map((item) => {
            const label = renderItem(item)
            const {id} = item
            return (
                <ListGroupItem
                    key = {id}
                    onClick={() => onItemSelected(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    }

    if (!itemList) {
        return <Spinner/>        
    }
    const items = renderList(itemList)
    
    return (
        <ListGroup>
            {items}
        </ListGroup>
    );
    
}

export default ItemList