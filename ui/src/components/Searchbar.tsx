import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import 'bootstrap/dist/css/bootstrap.min.css';
import SearchJobService from '../service/search-job-service';

export class SearchbarProp { }

export class Searchbar extends React.Component {

  searchService: SearchJobService;
  state: any = {};
  pageMaxEntries = 10;
  maxDescriptionLength = 1000;

  constructor(props: SearchbarProp) {
    super(props);
    this.state = {
      value: '',
      pageNumber: 1,
      jobList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.searchService = new SearchJobService();
  }

  componentDidMount() {
    this.loadJobList();
  }

  async loadJobList() {
    console.log(await this.searchService.search(
      this.state.value,
      (this.state.pageNumber - 1) * this.pageMaxEntries,
      this.pageMaxEntries
    ))
    await this.setState({
      jobList: await this.searchService.search(
        this.state.value,
        (this.state.pageNumber - 1) * this.pageMaxEntries,
        this.pageMaxEntries
      )
    });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event: React.SyntheticEvent) {
    // alert('You searched for a job which contain the following words: ' + this.state.value);
    await this.setState({ pageNumber: 1 });
    this.loadJobList();
    event.preventDefault();
  }

  async handleClickPrev(event: React.SyntheticEvent) {
    await this.setState({ pageNumber: this.state.pageNumber - 1 });
    // alert('Ai mers inapoi la pagina: ' + this.state.pageNumber);
    this.loadJobList();
    event.preventDefault();
  }

  async handleClickNext(event: React.SyntheticEvent) {
    await this.setState({ pageNumber: this.state.pageNumber + 1 });
    // alert('Ai mers mai departe la pagina: ' + this.state.pageNumber);
    this.loadJobList();
    event.preventDefault();
  }

  async onApply(url: string) {
    window.open(url, '_blank');
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
            D4C Search
          </Button>

        </InputGroup>

        <div >
          {this.state.jobList.map((job: any, i: any) => (
            <div key={i} className="cardsDetails">
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
                    {job.description.slice(0, Math.min(job.description.length, this.maxDescriptionLength))}{job.description.length > this.maxDescriptionLength ? '...' : ''}
                  </Card.Text>

                  <Card.Subtitle className="mb-2 text-muted employmentDetails" >
                    {job.employmentType}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted employmentDetails" >
                    {job.senorityLevel}
                  </Card.Subtitle>
                  <Button className="employmentDetails" variant="success" onClick={() => this.onApply(job.link)}>{job.source}</Button>
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

          <Button variant="success" className="navigationButtons" onClick={this.handleClickNext} disabled={this.state.jobList.length < this.pageMaxEntries}>
            NEXT
          </Button>
        </div>




      </Fragment>

    );
  }
}
