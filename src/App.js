import React, { useState, useEffect } from 'react';
import './App.css';
import { Table, Tag, Space, Button, Input, Select } from 'antd';
//import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const App = () => {

  const [fullData,setFullData] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const [mcap,setMcap] = useState();
  const [mcapWhere,setMcapWhere] = useState();
  const [price,setPrice] = useState();
  const [priceWhere,setPriceWhere] = useState();
  const [eps,setEps] = useState();
  const [epsWhere,setEpsWhere] = useState();
  const [callFn, setCallFn] = useState(0)
  const [searchValue, setSearchValue] = useState("");


  useEffect(() => {
    const jsonData = require('./export_data_records.json');
    console.log(jsonData);
    setFullData(jsonData);
    console.log(jsonData)
    setFilteredData(jsonData);      
  },[]);

useEffect(()=>{
if(callFn > 0){
  multipleFilter();
} 
},[callFn])

  const marketCap  = (e) => {
    console.log(e.substring(1));
    let where = e.substring(0, 1);
    let marketcap = e.substring(1);
    setMcap(marketcap);
    setMcapWhere(where);
    // var temp = [];

    // if(where === "a"){
    //   const filter = fullData.map((item)=>{
    //     if(parseFloat(item.mktcap.replace(/,/g, '')) > marketcap ){
    //       temp.push(item)
    //     }
    //   })
    //   console.log(temp);
    //   setFilteredData(temp)
    // }
    // else{
    //   const filter = fullData.map((item)=>{
    //     if(parseFloat(item.mktcap.replace(/,/g, '')) < marketcap ){
    //       temp.push(item)
    //     }
    //   })
    //   console.log(temp);
    //   setFilteredData(temp)
    // }
    setCallFn(callFn+1)
   }

  const epsChange = (e) => {
    let where = e.substring(0, 1);
    let epsTemp = e.substring(1);
    setEps(epsTemp);
    setEpsWhere(where);
    setCallFn(callFn+1)
  } 

  const priceChange = (e) => {
    let where = e.substring(0, 1);
    let priceTemp = e.substring(1);
    setPrice(priceTemp);
    setPriceWhere(where);
    setCallFn(callFn+1)
  } 

  const multipleFilter = () => {
    console.log("fil")
    let tempFilteredArray = [];
    fullData.map((item)=>{
      if(
        (mcapWhere ? (mcapWhere === 'a' ? parseFloat(item?.mktcap?.replace(/,/g, '')) > mcap : parseFloat(item?.mktcap?.replace(/,/g, '')) < mcap ): true ) && 
        (epsWhere ? (epsWhere === 'a' ? parseFloat(item?.eps) > eps : parseFloat(item?.eps) < eps ): true ) && 
        (priceWhere ? (priceWhere === 'a' ? parseFloat(item?.price) > price : parseFloat(item?.price) < price ): true )
      ){
        tempFilteredArray.push(item);
      }
    });
    console.log(tempFilteredArray)
    setFilteredData(tempFilteredArray)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //render: text => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      sorter: (a, b) => a.volume - b.volume,
    },
    {
      title: '52 Week Low',
      dataIndex: 'yearly_low',
      key: 'yearly_low',
    },
    {
      title: '52 Week High',
      dataIndex: 'yearly_high',
      key: 'yearly_high',
    },
    {
      title: 'P/E',
      dataIndex: 'pe',
      key: 'pe',
      sorter: (a, b) => a.pe - b.pe,
    },
    {
      title: 'P/B',
      dataIndex: 'pb',
      key: 'pb',
      sorter: (a, b) => a.pb - b.pb,
    },
    {
      title: 'EPS',
      dataIndex: 'eps',
      key: 'eps',
    },
    {
      title: 'Market Cap',
      dataIndex: 'mktcap',
      key: 'mktcap',
      sorter: (a, b) => a.pb - b.pb,
    },
    {
      title: 'Long Term View',
      key: 'view',
      dataIndex: 'view',
      render: (tags, render) => (
          
              <Tag color={ ((+render?.pe) < 25 ||(+render?.eps) > 50) ? 'green' : 'volcano'}>
                { ((+render?.pe) < 25 ||(+render?.eps) > 50) ? 'Bullish' : 'Bearish'}
              </Tag>
              
      ),
    },
  ];

      // Filter  data search
      const filterData = (e) => {
        if (e.target.value !== "") {
            setSearchValue(e.target.value);
            let results = [];
            const filterTable = fullData.filter(o =>
                Object.keys(o).some(k =>
                    String(o[k])
                        .toLowerCase()
                        .includes(e.target.value?.toLowerCase())
                )
            );
            filterTable.length > 0 ? setFilteredData([...filterTable]) : setFilteredData([]);
        } else {
            setSearchValue(e.target.value);
            setFilteredData([...fullData]);
        }
    };

  return (
    <div className="App">
      <div className="filterRow">
        {/* <div>
        Market Cap Greater than: 
        &nbsp;
        <Input 
          placeholder="Enter M Cap" 
          style = {{width : "150px"}}
        />   
        </div> */}
        <div>
          Market Cap (Cr)
          &nbsp;
          <Select
            placeholder="Choose Mcap"
            onChange={marketCap}
          >
            <Option value="a500">Above 500</Option>
            <Option value="a2000">Above 2000</Option>
            <Option value="a10000">Above 10,000</Option>
            <Option value="a50000">Above 50,000</Option>
            <Option value="a100000">Above 1,00,000</Option>
            <Option value="b500">Below 500</Option>
            <Option value="b2000">Below 2000</Option>
            <Option value="b10000">Below 10,000</Option>
            <Option value="b50000">Below 50,000</Option>
            <Option value="b100000">Below 1,00,000</Option>
          </Select>
        </div>
        &nbsp;
        &nbsp;
        <div>
          EPS
          &nbsp;
          <Select
            placeholder="Choose EPS"
            bordered = {true}
            onChange={epsChange}
          >
            <Option value="a5">Above 5</Option>
            <Option value="a10">Above 10</Option>
            <Option value="a50">Above 50</Option>
            <Option value="a100">Above 100</Option>
            <Option value="a150">Above 150</Option>
            <Option value="b5">Below 5</Option>
            <Option value="b20">Below 20</Option>
            <Option value="b50">Below 50</Option>
            <Option value="b100">Below 100</Option>
          </Select>
        </div>
        &nbsp;
        &nbsp;
        <div>
          Price
          &nbsp;
          <Select
            placeholder="Choose Stock Price"
            onChange={priceChange}
         >
            <Option value="a5">Above 5</Option>
            <Option value="a20">Above 20</Option>
            <Option value="a50">Above 50</Option>
            <Option value="a100">Above 100</Option>
            <Option value="a500">Above 500</Option>
            <Option value="a1000">Above 1000</Option>
            <Option value="a2000">Above 2000</Option>
            <Option value="a5000">Above 5000</Option>
            <Option value="b5">Below 5</Option>
            <Option value="b20">Below 20</Option>
            <Option value="b50">Below 50</Option>
            <Option value="b100">Below 100</Option>
            <Option value="b500">Below 500</Option>
            <Option value="b1500">Below 1500</Option>
            <Option value="b5000">Below 5000</Option>
          </Select>
        </div>
        <Input
          placeholder="Search"
          value={searchValue}
          style={{ width: "200px", marginLeft: "40vw"}}
          className="input-user-search"
          onChange={(e) => filterData(e)}
        />
      </div>
      <br/>
      <Table
        bordered
        columns={columns}
        dataSource={filteredData}
        pagination = {filteredData?.length > 15}
      />
    </div>
  );
}

export default App;
