import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

import './styles.css'

export default class MessageBubbly extends Component {
    render(props) {
        return (
            <div className={`message ${this.props.system ? 'system' : this.props.me ? 'me' : 'they'}`}>
                { this.props.system ? null : <span className="message-header">{this.props.me ? 'Eu' : this.props.name} às {moment(this.props.date).format('LT [de] L')}</span> }
                <span className="message-body">{this.props.text}</span>
            </div>
        );
    }
}
