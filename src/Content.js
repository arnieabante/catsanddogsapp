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
            limit:20,
            breedId:'',
            type:'dog',
            outputJson: [],
            isProcessing: false,
            jsonField:''
    });

    let handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    let GetBreeds = (e) => {
        e.preventDefault();

        let page = state.page;
        let limit = state.limit;

        //Set state of isProcessing to true
        setState({
            outputJson:[],
            isProcessing:true,
        });

        axios.get(window.api_url + 'api/v1/breeds?page=' + page + '&limit=' + limit, {
            headers : {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            if(response.data.success === true){
                setState({
                    outputJson:response.data.results,
                    isProcessing:false,
                    page:'',
                    limit:''
                });
            } else {
                setState({
                    outputJson:[],
                    isProcessing:false,
                    page:'',
                    limit:''
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            setState({
                outputJson:[],
                isProcessing:false
            });
        });
    };

    let GetImagePerType = (e) => {
        e.preventDefault();

        let type = state.type;
        let page = state.page;
        let limit = state.limit;

        //Set state of isProcessing to true
        setState({
            outputJson: [],
            isProcessing:true
        });

        axios.get(window.api_url + 'api/v1/breeds/'+type+'?page=' + page + '&limit=' + limit, {
            headers : {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            if(response.data.success === true){
                setState({
                    outputJson:response.data.results,
                    isProcessing:false,
                    page:'',
                    limit:'',
                    type:'',
                });
            } else {
                setState({
                    outputJson:[],
                    isProcessing:false,
                    page:'',
                    limit:'',
                    type:'',
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            setState({
                outputJson:[],
                isProcessing:false
            });
        });
    };

    let GetList = (e) => {
        e.preventDefault();

        let page = state.page;
        let limit = state.limit;

        //Set state of isProcessing to true
        setState({
            outputJson:[],
            isProcessing:true,
        });

        axios.get(window.api_url + 'api/v1/list?page=' + page + '&limit=' + limit, {
            headers : {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            if(response.data.success === true){
                setState({
                    outputJson:response.data.results,
                    isProcessing:false,
                    page:'',
                    limit:''
                });
            } else {
                setState({
                    outputJson:[],
                    isProcessing:false,
                    page:'',
                    limit:''
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            setState({
                outputJson:[],
                isProcessing:false
            });
        });
    };

    let GetImageById = (e) => {
        e.preventDefault();

        let type = state.type;
        let breedId = state.breedId;

        //Set state of isProcessing to true
        setState({
            outputJson:[],
            isProcessing:true
        });

        axios.get(window.api_url + 'api/v1/list/'+type+'/'+breedId, {
            headers : {
                'Content-Type': 'application/json',
                'X-Request-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            if(response.data.success === true && response.data.results !== null){
                setState({
                    outputJson:response.data.results,
                    isProcessing:false,
                    breedId:'',
                    type:''
                });
            } else {
                setState({
                    outputJson:[],
                    isProcessing:false,
                    breedId:'',
                    type:''
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            setState({
                outputJson:[],
                isProcessing:false
            });
        });
    };

    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col md={5}>
                        <Card className="shadow-lg">    
                            <Card.Header className="p-3" style={{backgroundColor: '#087A46'}}>
                                <h5 style={{color:'white'}}>API Documentation</h5>
                            </Card.Header>
                            <Card.Body>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>v1/breeds</Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Exercise A</h5>
                                            <label><b>Description:</b></label> Returns a paginated list of cat and dog breeds.
                                            <br />
                                            <label><b>Sample Request:</b></label> 127.0.0.1/catsanddogs_build/api/public/v1/breeds?page=1&limit=20
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-2">Page</div>
                                                <div className="col-md-3"><input type="textbox" name="page" value={state.page} className="form-control" onChange={handleChange}></input></div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-2">Limit</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control" value={state.limit} name="limit" onChange={handleChange}></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={GetBreeds}>Run</Button>
                                                </div>
                                            </div>
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
                                                <div className="col-md-2">Type</div>
                                                <div className="col-md-3">
                                                    <select className="form-control" name="type" value={state.type} onChange={handleChange}> 
                                                        <option value="">Select one</option>
                                                        <option value="cat">cat</option>
                                                        <option value="dog">dog</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-2">Page</div>
                                                <div className="col-md-3"><input type="textbox" name="page" value={state.page} className="form-control" onChange={handleChange}></input></div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-2">Limit</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control" value={state.limit} name="limit" onChange={handleChange}></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={GetImagePerType}>Run</Button>
                                                </div>
                                            </div>
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
                                                <div className="col-md-2">Page</div>
                                                <div className="col-md-3"><input type="textbox" name="page" value={state.page} className="form-control" onChange={handleChange}></input></div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-2">Limit</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control" value={state.limit} name="limit" onChange={handleChange}></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={GetList}>Run</Button>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>v1/list/:type/:id</Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Exercise D</h5>
                                            <label><b>Description:</b></label> Returns an image of either cat or dog by ID.
                                            <br />
                                            <label><b>Sample Request:</b></label> 127.0.0.1/catsanddogs_build/api/public/v1/list/cat/SJyBfg5NX
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-2">Type</div>
                                                <div className="col-md-3">
                                                    <select className="form-control" name="type" value={state.type} onChange={handleChange}> 
                                                        <option value="">Select one</option>
                                                        <option value="cat">cat</option>
                                                        <option value="dog">dog</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-2">Image ID:</div>
                                                <div className="col-md-3"><input type="textbox" className="form-control" name="breedId" value={state.breedId} onChange={handleChange}></input></div>
                                                <div className="col-md-1">
                                                    <Button variant="success" type="submit" onClick={GetImageById}>Run</Button>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={7}>
                    <Card className="shadow-lg">    
                            <Card.Header className="p-3" style={{backgroundColor: '#087A46'}}>
                                <h5 style={{color:'white'}}>Ouput</h5>
                            </Card.Header>
                            <Card.Body>
                                <Tabs defaultActiveKey="json" className='mb-3'>
                                <Tab eventKey="json" title="JSON Output">
                                    {state.isProcessing===true?<Spinner animation="border"/>:
                                        <JSONPretty id="json-pretty" data={state.outputJson}></JSONPretty>
                                    }
                                </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Content