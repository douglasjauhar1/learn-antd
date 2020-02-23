import React, { Component } from 'react'


export default class Localstrage extends Component {
    state = {
        nama : '',
        rememberMe : false
    }
    componentDidMount(){
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const nama = rememberMe ? localStorage.getItem('nama') : '';
        this.setState({ nama, rememberMe });
    }
    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        console.log(event)
        this.setState({ [input.name]: value });
    }
    handleSubmit = () => {
        const { nama, rememberMe } = this.state;
        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('nama', rememberMe ? nama : '');
    }
    render() {
        return (

           <div>
               <p>Remember Me</p>
               <input type="text" name="nama" value={this.state.nama} onChange={this.handleChange}/>
               <label>
        <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/> Remember me
      </label>
               <button type="submit" onClick={this.handleSubmit}>SImpan</button>
           </div>
        )
    }
}
