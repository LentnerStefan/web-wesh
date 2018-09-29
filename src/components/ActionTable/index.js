import './style.css'
import React, { Component } from "react";
//import logo from "./logo.svg";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import Hamoni from "hamoni-sync";



class ActionTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      firstName: "",
      lastName: ""
    };
  }
  handleChange = event => {
    if (event.target.name === "firstName")
      this.setState({ firstName: event.target.value });
    if (event.target.name === "lastName")
      this.setState({ lastName: event.target.value });
  };
  handleSubmit = event => {
    this.listPrimitive.push({
        firstName: this.state.firstName,
        lastName: this.state.lastName
    });
    this.setState({ firstName: "", lastName: "" });
    event.preventDefault();
    console.log("submit ok");
  };
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.data[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  render() {
    const { data } = this.state;
    return (
      <div className="ActionTable">

        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <h3>Add new record</h3>
            <label>
              FirstName:
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              LastName:
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </p>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "First Name",
                accessor: "firstName",
                Cell: this.renderEditable
              },
              {
                Header: "Last Name",
                accessor: "lastName",
                Cell: this.renderEditable
              },
              {
                Header: "Full Name",
                id: "full",
                accessor: d => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: d.firstName + " " + d.lastName
                    }}
                  />
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

// Initialize Hamoni DB
const componentDidMount = () => {
    let hamoni = new Hamoni("65879366-edcf-4167-ab97-b69869fbf6c9", "b3d66acccd044d088348938ae38d5606");
    hamoni
      .connect()
      .then(() => {
        hamoni
        .get("Web-Wesh")
        .then(listPrimitive => {
          this.listPrimitive = listPrimitive;
          this.setState({
            data: [...listPrimitive.getAll()]
          });
          listPrimitive.onItemAdded(item => {
            this.setState({ data: [...this.state.data, item.value] });
          });
          listPrimitive.onItemUpdated(item => {
            let data = [
            ...this.state.data.slice(0, item.index),
            item.value,
            ...this.state.data.slice(item.index + 1)
            ];
            this.setState({ data: data });
          });
          listPrimitive.onSync(data => {
            this.setState({ data: data });
          });
        })
        .catch(console.log);
      })
      .catch(console.log);
  };
componentDidMount();

export default ActionTable;
