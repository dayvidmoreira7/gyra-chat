import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MessageBubbly from '../../components/MessageBubbly';

import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

import './styles.css'

export default class Chat extends Component {

    constructor() {
        super();
        this.state = {
            redirect: '',

            messages: [],
            userData: {},

            message: ''
        };
    }

    handleExit = () => {
        localStorage.clear();
        this.setState({redirect: '/'});
    }

    render() {
        return (
            <div className="chat-container">
                { this.state.redirect !== '' ? <Redirect to={this.state.redirect} /> : null }
                <Row>
                    <Col sm={{size: 8, offset: 2}} xs={{size: 10, offset: 1}}>
                        <div className="chat-box">
                            <div className="room-area">
                                <Button onClick={() => {this.handleExit()}} color="danger">X</Button>
                            </div>
                            <div className="messages-area">
                                <MessageBubbly me name="Dayvid" date={new Date()} text="Oi amor! Tudo bem ?" />
                                <MessageBubbly name="Bruna" date={new Date()} text="Tudo ótimo! E com você?" />
                                <MessageBubbly me name="Dayvid" date={new Date()} text="Estou ótimo! Que bom que está tudo bem!" />
                            </div>
                            <div className="user-area">
                                <form>
                                    <InputGroup className="user-message">
                                        <Input type="textarea" rows="2" placeholder="Mensagem" value={this.state.message} onChange={(e) => {this.setState({message: e.target.value})}}/>
                                    </InputGroup>
                                    <Button disabled={this.state.message.length < 1} type="submit" className="user-send" color="secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/>
                                        </svg>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
