import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import 'bootstrap/dist/css/bootstrap.min.css';

export class SearchbarProp {}

export class Searchbar extends React.Component {

    state : any  = {};
  
    constructor(props:SearchbarProp) {
      super(props);
      this.state = {
        value: '',
        pageNumber :  1,
        pageMaxEntries : 10,
        skip : 10,
        jobList : [
            {
              source: "string",
              jobId: "string",
              jobIndex: 0,
              link: "string",
              title: "string",
              company: "string",
              place: "string",
              date: "string",
              description: "string",
              senorityLevel: "string",
              jobFunction: "string",
              employmentType: "string",
              industries: "string",
            },
            {
              source: "string",
              jobId: "string",
              jobIndex: 0,
              link: "string",
              title: "string",
              company: "string",
              place: "string",
              date: "string",
              description: "string",
              senorityLevel: "string",
              jobFunction: "string",
              employmentType: "string",
              industries: "string",
          },
          {
            source: "string",
            jobId: "string",
            jobIndex: 0,
            link: "string",
            title: "string",
            company: "string",
            place: "string",
            date: "string",
            description: "string",
            senorityLevel: "string",
            jobFunction: "string",
            employmentType: "string",
            industries: "string",
          },
          {
            source: "string",
            jobId: "string",
            jobIndex: 0,
            link: "string",
            title: "string",
            company: "string",
            place: "string",
            date: "string",
            description: "string",
            senorityLevel: "string",
            jobFunction: "string",
            employmentType: "string",
            industries: "string",
          },
          {
            source: "string",
            jobId: "string",
            jobIndex: 0,
            link: "string",
            title: "string",
            company: "string",
            place: "string",
            date: "string",
            description: "string",
            senorityLevel: "string",
            jobFunction: "string",
            employmentType: "string",
            industries: "string",
          },
          {
            source: "string",
            jobId: "string",
            jobIndex: 0,
            link: "string",
            title: "string",
            company: "string",
            place: "string",
            date: "string",
            description: "string",
            senorityLevel: "string",
            jobFunction: "string",
            employmentType: "string",
            industries: "string",
          },
          {
            source: "string",
            jobId: "string",
            jobIndex: 0,
            link: "string",
            title: "string",
            company: "string",
            place: "string",
            date: "string",
            description: "string",
            senorityLevel: "string",
            jobFunction: "string",
            employmentType: "string",
            industries: "string",
          },
          {
            source: "string",
            jobId: "string",
            jobIndex: 0,
            link: "string",
            title: "string",
            company: "string",
            place: "string",
            date: "string",
            description: "string",
            senorityLevel: "string",
            jobFunction: "string",
            employmentType: "string",
            industries: "string",
          },
          {
            source: "Google",
            jobId: "string",
            jobIndex: 0,
            link: "https://www.google.com",
            title: "tis tis tis",
            company: "string",
            place: "string",
            date: "string",
            description: "string",
            senorityLevel: "string",
            jobFunction: "string",
            employmentType: "string",
            industries: "string",
        }]
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClickPrev = this.handleClickPrev.bind(this);
      this.handleClickNext = this.handleClickNext.bind(this);
    }
  
    handleChange(event : React.ChangeEvent<HTMLInputElement>) {
      this.setState({value: event.target.value});
    }
  
    async handleSubmit(event : React.SyntheticEvent) {
      // alert('You searched for a job which contain the following words: ' + this.state.value);
      await this.setState({pageNumber: 1, skip: this.state.pageMaxEntries });
      event.preventDefault();
    }

    async handleClickPrev(event : React.SyntheticEvent) {
      await this.setState({pageNumber: this.state.pageNumber - 1, skip: (this.state.pageNumber - 1) * this.state.pageMaxEntries });
      // alert('Ai mers inapoi la pagina: ' + this.state.pageNumber);
      event.preventDefault();
    }

    async handleClickNext(event : React.SyntheticEvent) {
      await this.setState({pageNumber: this.state.pageNumber + 1, skip: (this.state.pageNumber + 1) * this.state.pageMaxEntries});
      // alert('Ai mers mai departe la pagina: ' + this.state.pageNumber);
      event.preventDefault();
    }
  
    
    render() {
      return (
        <Fragment>
          
            <InputGroup className="searchBar" size="lg">

              <Form.Control
                placeholder="Engineer"
                aria-label="SearchBar"
                aria-describedby="basic-addon2"
                value={this.state.value}  
                onChange={this.handleChange}
              />

              <Button variant="outline-success" className="searchSubmitButton" onClick={this.handleSubmit}>
                Search
              </Button>

            </InputGroup>
          
            <div >
            {this.state.jobList.map((job:any, i:any) =>(
                <div className="cardsDetails" >
              <Card>
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted employmentDetails">
                    {job.company}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted employmentDetails">
                    {job.industries}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted employmentDetails">
                    {job.place}
                  </Card.Subtitle>

                  <Card.Text>
                  {job.description}
                  </Card.Text>

                  <Card.Subtitle className="mb-2 text-muted employmentDetails" >
                    {job.employmentType}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted employmentDetails" >
                    {job.senorityLevel}
                  </Card.Subtitle>
                  <Button className="employmentDetails" variant="success"  href={job.link}>{job.source}</Button>
                </Card.Body>
              </Card>
              </div>
              ))}
            </div>
            
            <div className="pageNavigation">
              <Button variant="success" className="navigationButtons" onClick={this.handleClickPrev} disabled={this.state.pageNumber < 2}>
              PREV
              </Button>

              <div className="pageNumber">
                Page {this.state.pageNumber}
              </div>

              <Button variant="success" className="navigationButtons" onClick={this.handleClickNext} disabled={this.state.jobList.length  < this.state.pageMaxEntries}>
              NEXT
              </Button>
            </div>


        
        
      </Fragment>

      );
    }
  }
  