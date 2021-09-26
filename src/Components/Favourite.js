import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import FavCards from './FavCards'
import axios from 'axios'
import ModelForm from './ModelForm'
import { withAuth0 } from '@auth0/auth0-react';


export class Favourite extends Component {

    constructor(props) {
        super(props)

        this.state = {
            favData: [],
            show: false
        }
    }


    componentDidMount = () => {
        if(this.props.auth0.isAuthenticated){
        let url2 = `http://localhost:4005/getData/${this.props.auth0.user.email}`
        axios.get(url2).then(item => {
            this.setState({
                favData: item.data,
                show: true,
                image_link : "",
                name : "",
                description : "",
                price : "",
                index : 0 ,
                showModel : false 
            })
        })
    }
}

    delete =(index)=>{
       let id = this.state.favData[index]._id
       axios.delete(`${process.env.REACT_APP_SERVER}/deleteMakeup/${id}`).then(element=>{
        this.setState({
            favData: element.data,
            show: true
        })
       })
    }

    showModelForm= (index)=>{
        this.setState({
            image_link : this.state.favData[index].image_link ,
            name : this.state.favData[index].name ,
            description : this.state.favData[index].description ,
            price : this.state.favData[index].price ,
            index : index ,
            showModel : true

        })
        
    }

    handleClose=()=>{
        this.setState({
            showModel : false
        })
    }

    update=(e)=>{
        e.preventDefault();
        let id = this.state.favData[this.state.index]._id
        let data ={
            image_link : e.target.image_link.value,
            name : e.target.name.value,
            description : e.target.description.value,
            price : e.target.price.value,

        }
        axios.put(`${process.env.REACT_APP_SERVER}/updateMakeup/${id}`,data).then(item=>{
            this.setState({
                favData: item.data,
                show: true
            })
        })
    }

    render() {
        return (
            <>
                <Row style={{ gap: '50px', marginTop: '60px' }}>
                    {this.state.show && this.state.favData.map((item, idx) => {
                        return (
                            <FavCards item={item} idx={idx} delete={this.delete}  showModelForm={this.showModelForm} />
                        )
                    })}

                    <ModelForm image_link={this.state.image_link} name={this.state.name} description={this.state.description}
                     price={this.state.price} showModel={this.state.showModel} handleClose={this.handleClose} update={this.update} />
                </Row>
            </>
        )
    }
}

export default withAuth0(Favourite)
