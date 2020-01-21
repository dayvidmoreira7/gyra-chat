import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Row, Col, Button } from 'reactstrap';

import './styles.css'

export default class NotFound extends Component {

    constructor() {
        super();
        this.state = {
            redirect: '',
        };
    }

    render() {
        return (
            <div className="notfound-container">
                { this.state.redirect !== '' ? <Redirect to={this.state.redirect} /> : null }
                <Row>
                    <Col className="text" sm={{size: 8, offset: 2}} xs={12}>
                        <h2>A página que você está procurando não existe</h2>
                        <Link className="back-button" to={'/'}>Voltar para o início</Link>
                    </Col>
                </Row>
            </div>
        );
    }
}
