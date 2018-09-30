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
      prenom: "",
      action: "",
      etat:[],
      commentaire:""
    };
  }
  // Initialize Hamoni DB
  componentDidMount () {
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
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  handleChange = event => {
    if (event.target.name === "prenom")
      this.setState({ prenom: event.target.value });
    if (event.target.name === "action")
      this.setState({ action: event.target.value });
    if (event.target.name === "date")
    //would be better to adapt date display to local standards
      this.setState({ date: event.target.value });
    if (event.target.name === "etat1")
      this.setState({ etat: event.target.value });
    if (event.target.name === "etat2")
      this.setState({ etat: event.target.value });
    if (event.target.name === "etat3")
      this.setState({ etat: event.target.value });
    if (event.target.name === "etat4")
      this.setState({ etat: event.target.value });
    if (event.target.name === "commentaire")
      this.setState({ commentaire: event.target.value });
  };

  handleSubmit = event => {
    this.listPrimitive.add({
      prenom: this.state.prenom,
      action: this.state.action,
      date: this.state.date,
      etat1: this.state.etat1,
      etat2: this.state.etat2,
      etat3: this.state.etat3,
      etat4: this.state.etat4,
      commentaire: this.state.commentaire
    });
    this.setState({ prenom: "", action: "", date:"", etat1:"", etat2:"", etat3:"", etat4:"", commentaire:"" });
    event.preventDefault();
  };

  handleDelete = event => {
      this.setState({ prenom: "", action: "", date:"", etat1:"", etat2:"", etat3:"", etat4:"", commentaire:"" });
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
        <h2>Entrainement sur todo list </h2>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <h4>Nouvelle Action</h4>
            <label>
              Prénom:
              <input
                type="text"
                name="prenom"
                value={this.state.prenom}
                onChange={this.handleChange}
                width="150"
              />
            </label>{" "}
            <label>
              Action:
              <input
                type="text"
                name="action"
                value={this.state.action}
                onChange={this.handleChange}
              />
            </label>
            {"   "}
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </label>
            {"   "}
            <label>
              <form>
                Etat:
                <input type="radio" name="etat" value={this.state.etat1} onChange={this.handleChange}/> A faire
                <input type="radio" name="etat" value={this.state.etat2} onChange={this.handleChange}/> En cours
                <input type="radio" name="etat" value={this.state.etat3} onChange={this.handleChange}/> Bloqué
                <input type="radio" name="etat" value={this.state.etat4} onChange={this.handleChange}/> Terminé
              </form>
            </label>
            {"   "}
            <label>
              Commentaire:
              <input
                type="text"
                name="commentaire"
                value={this.state.commentaire}
                onChange={this.handleChange}
              />
            </label>
            {"   "}
            <input type="submit" value="Add" />
          </form>
        </p>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Prénom",
                accessor: "prenom",
                Cell: this.renderEditable,
                // il faudrait rendre ça dynamique ?
                maxWidth: 150
              },
              {
                Header: "Action",
                accessor: "action",
                Cell: this.renderEditable,
                minWidth: 200
              },
              {
                Header: "Date",
                accessor: "date",
                Cell: this.renderEditable,
                width : 100
              },
              {
                Header: "Etat",
                accessor: "etat",
                Cell: this.renderEditable,
                width : 50
              },
              {
                Header: "Commentaire",
                accessor: "commentaire",
                Cell: this.renderEditable
              },
              {
                id: 'delete',
                accessor: "",
                Cell: row => (<button onClick={this.handleDelete}>Effacer</button>),
                width: 70
              },
            ]}
            defaultPageSize={10}
            defaultSorted={[
                      {
                        id: "age",
                        desc: true
                      }
                    ]}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}


export default ActionTable;
