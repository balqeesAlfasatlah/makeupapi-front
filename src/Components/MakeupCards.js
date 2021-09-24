import React, { Component } from 'react'
import { Card,Button,Col } from 'react-bootstrap'

export class MakeupCards extends Component {
    render() {
        return (
            <>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={this.props.item.image_link} />
                        <Card.Body>
                            <Card.Title>{this.props.item.name}</Card.Title>
                            <Card.Text>
                            {this.props.item.description}
                            </Card.Text>
                            <Card.Title>{this.props.item.price}</Card.Title>
                            <Button onClick={()=>{this.props.addMakeup(this.props.item)}} variant="primary">Add to favourite</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        )
    }
}

export default MakeupCards
