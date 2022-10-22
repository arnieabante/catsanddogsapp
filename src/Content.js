import React, {useState} from 'react'
import { Card, Container, Row, Col, Button, Form, Accordion } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import SidePanel from './SidePanel'
import JSONPretty from 'react-json-pretty'

let Content = () => {

    let [state, setState] = useState({
            page:1,
            limit:1,
            breedId:'',
            outputJson: [],
            isProcessing: false,
            jsonField:'',
            errorMsg:'',
            breedsJson: [],
            imagesJson: [],
            listJson: [],
            imagePerIdJson: [],
    });

    let handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    let ProcessBreeds = (e) => {
        e.preventDefault();

        let page = state.page;
        let limit = state.limit;

        //Set state of isProcessing to true
        setState({
            breedsJson: [],
            isProcessing:true,
            errorMsg: ''
        });

        axios.get(window.api_url + 'api/v1/breeds?page=' + page + '&limit=' + limit, {
            headers : {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            console.log(response.data);
            if(response.data.success === true){
                setState({
                    breedsJson:response.data.results,
                    isProcessing:false,
                    page:'',
                    limit:''
                });
            } else {
                setState({
                    breedsJson:[],
                    isProcessing:false,
                    errorMsg: response.data.message,
                    page:'',
                    limit:''
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            setState({
                breedsJson:[],
                isProcessing:false
            });
        });
    };

    let ClearFields = (e) => {
        e.preventDefault();
        //Set state of isProcessing to true
        setState({
            outputJson: [],
            isProcessing:false,
            errorMsg:'',
            jsonField:''
        });
    };

    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col md={12}>
                        <Card className="shadow-lg">    
                            <Card.Header className="p-3" style={{backgroundColor: '#087A46'}}>
                                <h5 style={{color:'white'}}>API Documentation</h5>
                            </Card.Header>
                            <Card.Body>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>v1/breeds</Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Exercise A</h5>
                                            <label><b>Description:</b></label> Returns a paginated list of cat and dog breeds.
                                            <br />
                                            <label><b>Sample Request:</b></label> 127.0.0.1/catsanddogs_build/api/public/v1/breeds?page=1&limit=20
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-1">Page</div>
                                                <div className="col-md-3"><input type="textbox" name="page" value={state.page} className="form-control" onChange={handleChange}></input></div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-1">Limit</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control" value={state.limit} name="limit" onChange={handleChange}></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={ProcessBreeds}>Run</Button>
                                                </div>
                                            </div>
                                            <br />
                                            <Tabs defaultActiveKey="json" className='mb-3'>
                                                <Tab eventKey="json" title="JSON Output">
                                                    <JSONPretty id="json-pretty" data={state.breedsJson}></JSONPretty>
                                                </Tab>
                                            </Tabs>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>v1/breeds/:breed</Accordion.Header>
                                        <Accordion.Body>
                                        <h5>Exercise B</h5>
                                            <label><b>Description:</b></label> Returns a paginated image of cats or dogs by breed
                                            <br />
                                            <label><b>Sample Request:</b></label> 127.0.0.1/catsanddogs_build/api/public/v1/breeds/:cat?page=1&limit=20
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-1">Type</div>
                                                <div className="col-md-3">
                                                    <select className="form-control">
                                                        <option>cat</option>
                                                        <option>dog</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-1">Page</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control"></input></div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-1">Limit</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control"></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={ProcessBreeds}>Run</Button>
                                                </div>
                                            </div>
                                            <br />
                                            <Tabs defaultActiveKey="json" className='mb-3'>
                                                <Tab eventKey="json" title="JSON Output">
                                                </Tab>
                                            </Tabs>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>v1/list</Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Exercise C</h5>
                                            <label><b>Description:</b></label> Returns a combined list of cats and dogs.
                                            <br />
                                            <label><b>Sample Request:</b></label> 127.0.0.1/catsanddogs_build/api/public/v1/list?page=1&limit=20
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-1">Page</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control"></input></div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-1">Limit</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control"></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={ProcessBreeds}>Run</Button>
                                                </div>
                                            </div>
                                            <br />
                                            <Tabs defaultActiveKey="json" className='mb-3'>
                                                <Tab eventKey="json" title="JSON Output">
                                                </Tab>
                                            </Tabs>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>v1/list/:type/:id</Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Exercise A</h5>
                                            <label><b>Description:</b></label> Returns an image of either cat or dog by ID.
                                            <br />
                                            <label><b>Sample Request:</b></label> 127.0.0.1/catsanddogs_build/api/public/v1/list/cat/SJyBfg5NX
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-1">Image ID:</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control"></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={ProcessBreeds}>Run</Button>
                                                </div>
                                            </div>
                                            <br />
                                            <Tabs defaultActiveKey="json" className='mb-3'>
                                                <Tab eventKey="json" title="JSON Output">
                                                </Tab>
                                            </Tabs>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                        {state.errorMsg === ''?'':
                            <Alert key="danger" variant="danger" className="mt-3">
                                {state.errorMsg}
                            </Alert>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Content