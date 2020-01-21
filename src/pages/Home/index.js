import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

import './styles.css'

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            redirect: '',

            username: ''
        };
    }

    handleEntry = (e) => {
        e.preventDefault();
        this.setState({redirect: '/chat'});
    }

    componentWillMount = () => {
        document.title = "GyraChat - Lobby"
    }

    render() {
        return (
            <div className="home-container">
                { this.state.redirect !== '' ? <Redirect to={this.state.redirect} /> : null }
                <Row>
                    <Col className="entrance" sm={{size: 8, offset: 2}} xs={12}>
                        <h2>Bem-vindo ao <span className="highlight-text">GyraChat</span></h2>
                        <form onSubmit={this.handleEntry}>
                            <InputGroup className="input">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>@</InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Seu nome" value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}}/>
                            </InputGroup>
                            <Button type="submit" block color="secondary" disabled={this.state.username.length < 1}>Entrar</Button>
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }
}
