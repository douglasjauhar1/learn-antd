import React, { Component } from 'react'
import {Modal, Button, Table} from 'antd'
import axios from 'axios'
import Column from 'antd/lib/table/Column'
class Home extends Component {
    constructor(props){
        super(props)
        this.columns = [
            {
              title: 'name',
              dataIndex: 'name',
              width: '30%',
              editable: true,
            },
            {
              title: 'age',
              dataIndex: 'age',
              editable: true,
            },
            {
              title: 'address',
              dataIndex: 'address',
              editable: true,
            },
          ];
      
        this.state = {
            visible : false,
            data : [],
            pagination : {},
            formData : {
                data : '',
                data2 : ''
            }
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
    handleChange = (event) => {
        let datas = {...this.state.formData}
        datas[event.target.name] = event.target.value;
        this.setState({
            formData : datas
        })
        console.log(datas)
    }

    handleSubmits = () => {
        let datas = {...this.state.formData}
        localStorage.setItem('myValueInLocalStorage', JSON.stringify(datas));
        console.log('a', datas)
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
        // console.log('edo',this.state.data)
     
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
          rowClassName={() => 'editable-row'}
        >
          
    <Table
    dataSource={this.state.data}
    rowSelection={rowSelection} 
    pagination={this.state.pagination}
    onChange={this.handleTableChange}
    scroll={{ x: 200, y: 300 }}
    pagination={{ pageSize: 5 }} 
    
    >
        <Column title="id" dataIndex="id" key="id"/>
        <Column title="title" dataIndex="title" key="title" />
        <Column title="title" dataIndex="body" key="body"/>
        <input type="text"/>

        </Table>
        {/* <Table columns={columns}/> */}
        </Modal>

            <input type="text" name="data" onChange={this.handleChange}/>
            <input type="text" name="data2" onChange={this.handleChange}/>
            <button type="submit" onClick={this.handleSubmits}>Simpan</button>
        <p>From localStorage </p>
        <button type="submit" onClick={this.handleGet}>Get</button>
            </div>
        )
    }
}

export default Home
