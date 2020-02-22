import React, { Component } from 'react'
import {Modal, Button, Table} from 'antd'
import axios from 'axios'
import Column from 'antd/lib/table/Column'
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible : false,
            data : [],
            pagination : {},
        }
    }
    showModal = () => {
        this.setState({
            visible : true
        })
    }
    handleSubmit = () => {
            alert('data')
    }
    handleCancel = () => {
        this.setState({
            visible : false
        })
    }
    handleTableChange = (pagination, filters, sorter) => {


    }
    componentDidMount(){
        axios({
            method : 'get',
            url : 'https://jsonplaceholder.typicode.com/posts?userId=1',
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
            let result = res.data
            let pagination = {...this.state.pagination}
            pagination.total = 10;
            console.log(result)
            this.setState({
                data : result
        })
      
 

        }) 
    }
    onChangeSelect = selectedRowKeys =>{
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
   
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = { 
            selectedRowKeys,
            onChange : this.onChangeSelect,
            selections : [{
                key: "all-data",
                text : 'Select All data',
                onSelect : () => {
                    this.setState({
                        selectedRowKeys : [...this.state.data.key()]
                    })
                }
            }]

        }
        console.log('edo',this.state.data)
        return (
            <div>
      <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleData}
          onCancel={this.handleCancel}
        >
          
    <Table
    dataSource={this.state.data}
    rowSelection={rowSelection} 
    pagination={this.state.pagination}
    onChange={this.handleTableChange}

    >
        <Column title="id" dataIndex="id" key="id"/>
        <Column title="title" dataIndex="title" key="title"/>
        <Column title="title" dataIndex="body" key="body"/>

        </Table>

        </Modal>

                
            </div>
        )
    }
}

export default Home
