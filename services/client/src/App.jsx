import React, { Component } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import About from "./components/About";
import NavBar from "./components/NavBar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      username: "",
      email: "",
      title: "Gruezo.com",
    };
    // this.addUser = this.addUser.bind(this); #use this only if an arrow function isn't used for addUser method below

    // this.handleChange = this.handleChange.bind(this); #use this only if an arrow function isn't used for handleChange method below
  }

  componentDidMount() {
    this.getUsers();
  }

  addUser = (event) => {
    event.preventDefault();
    console.log("sanity check!");
    console.log(this.state);

    const data = {
      username: this.state.username,
      email: this.state.email,
    };

    axios
      .post(`${process.env.REACT_APP_API_SERVICE_URL}/users`, data)
      .then((res) => {
        console.log(res);
        this.getUsers();
        this.setState({
          username: "",
          email: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUsers() {
    axios
      .get(`${process.env.REACT_APP_API_SERVICE_URL}/users`)
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  render() {
    return (
      <div>
        <NavBar title={this.state.title} />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-half">
                <br />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <div>
                        <h1 className="title is-1 is-1">Users</h1>
                        <hr />
                        <br />
                        <AddUser
                          username={this.state.username}
                          email={this.state.email}
                          addUser={this.addUser}
                          // eslint-disable-next-line react/jsx-handler-names
                          handleChange={this.handleChange}
                        />
                        <br />
                        <br />
                        <UsersList users={this.state.users} />
                      </div>
                    }
                  />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/register" element={<RegisterForm />} />
                  <Route exact path="/login" element={<LoginForm />} />
                </Routes>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
