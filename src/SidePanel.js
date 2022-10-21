import React, {useState} from 'react'
import { Card, Col, Button, Form } from 'react-bootstrap'

let SidePanel = () => {
    return (
        <>
            <Col md={3}>
                <Card className="shadow-lg">    
                    <Card.Header className="p-3" style={{backgroundColor: '#087A46'}}>
                        <h5 style={{color:'white'}}>API</h5>
                    </Card.Header>
                    <Card.Body>
                        <ul>        
                            <li><a href="">/v1/breeds</a></li>
                            <li><a href="">/v1/breeds/:breed</a></li>
                            <li><a href="">/v1/list</a></li>
                            <li><a href="">/v1/list/:type/:id</a></li>
                        </ul>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default SidePanel