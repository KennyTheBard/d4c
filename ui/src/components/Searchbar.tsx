import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

export class SearchbarProp {}

export class Searchbar extends React.Component {

    state : any  = {};
  
    constructor(props:SearchbarProp) {
      super(props);
      this.state = {
        value: '',
        pageNumber :  1,
        skip : 10,
        jobList : [
          "purple",
          "red",
          "rewerd",
          "rewred",
          "rewrd",
          "rewerd",
          "rewerd",
          "rew3rd",
          "rewerd",
          "rweed"
        ]
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
      alert('You searched for a job which contain the following words: ' + this.state.value);
      await this.setState({pageNumber: 1, skip: 10 });
      event.preventDefault();
    }

    async handleClickPrev(event : React.SyntheticEvent) {
      await this.setState({pageNumber: this.state.pageNumber - 1, skip: (this.state.pageNumber - 1) * 10 });
      // alert('Ai mers inapoi la pagina: ' + this.state.pageNumber);
      event.preventDefault();
    }

    async handleClickNext(event : React.SyntheticEvent) {
      await this.setState({pageNumber: this.state.pageNumber + 1, skip: (this.state.pageNumber + 1) * 10});
      // alert('Ai mers mai departe la pagina: ' + this.state.pageNumber);
      event.preventDefault();
    }
  
  
    render() {
      return (
        <Fragment>
          
            <InputGroup className="searchBar">

              <Form.Control
                className="searchBar"
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

            <table>
            {this.state.jobList.map((job:any, i:any) =>(
              <tr key={i}>
                {<td>
                  {job}
                </td>}
              </tr>
            ))}
            </table>

            <div className="pageNavigation">
              <Button variant="outline-success" className="navigationButtons" onClick={this.handleClickPrev} disabled={this.state.pageNumber < 2}>
              PREV
              </Button>

              <div  className="navigationButtons">
              {this.state.pageNumber}
              --
              {this.state.skip}
              </div>

              <Button variant="outline-success" className="navigationButtons" onClick={this.handleClickNext}>
              NEXT
              </Button>
            </div>


        
        
      </Fragment>

      );
    }
  }
  