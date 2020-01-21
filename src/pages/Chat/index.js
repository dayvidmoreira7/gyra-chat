import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import io from 'socket.io-client';

import MessageBubbly from '../../components/MessageBubbly';

import { Row, Col, InputGroup, Input, Button } from 'reactstrap';

import './styles.css'

export default class Chat extends Component {

    constructor() {
        super();
        this.state = {
            redirect: '',
            loading: false,
            status: false,

            messages: [],
            username: localStorage.getItem('username'),

            message: ''
        };

        if(this.state.username) {
            const socket = io('https://gyra-chat-api.herokuapp.com');
            
            socket.on('roomMoves', data => {
                let messages = this.state.messages;
                messages.push(data);
                this.setState({messages});
            });
            socket.on('newMessage', data => {
                let messages = this.state.messages;
                messages.push(data);
                this.setState({messages});
            })
        }
    }

    setupRoom = async () => {
        let response = await api.get('/room');
        if(response.status === 200) {
            let messages = response.data;
            this.setState({messages, status: true});
        }
    }

    handleSendMessage = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        let response = await api.post('/room/message', { senderName: this.state.username, text: this.state.message });
        if(response.status === 200) {
            this.setState({ message: '' });
        } else {
            alert('Ocorreu um erro durante o envio da mensagem');
        }
        this.setState({loading: false});
    }

    handleExit = async () => {
        let response = await api.post('/session/exit', { username: this.state.username });
        if(response.status === 200) {
            localStorage.clear();
            window.location.reload();
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentWillMount = () => {
        document.title = "Gyrachat - Sala de Bate-papo"
        if(!this.state.username) this.setState({redirect: '/'})
        else this.setupRoom();
    }

    componentDidMount = () => {
        this.scrollToBottom();
    }
      
      componentDidUpdate = () => {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className="chat-container">
                { this.state.redirect !== '' ? <Redirect to={this.state.redirect} /> : null }
                <Row>
                    <Col sm={{size: 8, offset: 2}} xs={{size: 12}}>
                        <div className="chat-box">
                            <div className="room-area">
                                <Button className="close-button" onClick={() => {this.handleExit()}} color="danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    <path d="M0 0h24v24H0z" fill="none"/></svg>
                                </Button>
                                <span>Sala de bate-papo geral</span>
                                <div className={`room-status ${this.state.status ? 'up' : 'down'}`}></div> {/* up || down */}
                            </div>
                            <div id="message-area" className="messages-area">
                                {
                                    this.state.messages.map((msg, i) => {
                                        return (
                                            <MessageBubbly key={i}
                                                system={msg.senderName === 'system'}
                                                me={msg.senderName === this.state.username ? true : false}
                                                name={msg.senderName}
                                                text={msg.text}
                                                date={msg.senderName === 'system' ? new Date() : msg.createdAt} 
                                            />
                                        )
                                    })
                                }
                                <div style={{ float:"left", clear: "both" }}
                                    ref={(el) => { this.messagesEnd = el; }}>
                                </div>
                                {/* <MessageBubbly me name="Dayvid" date={new Date()} text="Oi amor! Tudo bem ?" />
                                <MessageBubbly name="Bruna" date={new Date()} text="Tudo ótimo! E com você?" />
                                <MessageBubbly me name="Dayvid" date={new Date()} text="Estou ótimo! Que bom que está tudo bem!" />
                                <MessageBubbly system text="Akira entrou na sala" /> */}
                            </div>
                            <div className="user-area">
                                <form onSubmit={this.handleSendMessage}>
                                    <InputGroup className="user-message">
                                        <Input disabled={!this.state.status || this.state.loading} type="textarea" rows="2" placeholder="Mensagem" value={this.state.message} onChange={(e) => {this.setState({message: e.target.value})}}/>
                                    </InputGroup>
                                    <Button disabled={this.state.message.length < 1 || this.state.loading} type="submit" className="user-send" color="secondary">
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
