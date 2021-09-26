import axios from 'axios'
import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import MakeupCards from './MakeupCards'
import { withAuth0 } from '@auth0/auth0-react';


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             makeupData : [],
             show : false
        }
    }
    

    componentDidMount=()=>{
        let url2=`${process.env.REACT_APP_SERVER}/getMakeup`
        axios.get(url2).then(item=>{
            this.setState({
                makeupData : item.data,
                show : true
            })
        })
    }

    addMakeup=(data)=>{
        let newData= {
            email : this.props.auth0.user.email ,
            image_link : data.image_link,
            name : data.name,
            description : data.description,
            price : data.price,
        }
        axios.post(`${process.env.REACT_APP_SERVER}/addMakeup`,newData)
    }

   
    render() {
        return (
            <>
            <Row style={{gap:'50px' , marginTop: '60px'}}>
            {this.state.show && this.state.makeupData.map((item,idx)=>{
                    return(
                        <MakeupCards item={item} addMakeup={this.addMakeup} />
                    )
                })}
            </Row>
            </>
        )
    }
}

export default withAuth0(Home)
