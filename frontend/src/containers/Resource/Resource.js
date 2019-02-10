import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem, Image } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";


import banner from "../../asset/banner.jpg";


class Resource extends Component {
  state = {
    isLoading: true,
    notes: []
  };

  async componentDidMount() {
    try {
      const notes = await this.notes();
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return API.get("notes", "/notes");
  }
  
  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
        ? <LinkContainer
            key={note.noteId}
            to={`/notes/${note.noteId}`}
          >
            <ListGroupItem header={note.content.trim().split("\n")[0]}>
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
      : <LinkContainer
          key="new"
          to="/notes/new"
        >
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>ETL Project</h1>
        <p><i>English where Teaching and Learning are met</i></p>
        <Image src={banner} className="banner" rounded/>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Teacher
          </Link>
          <Link to="/login" className="btn btn-info btn-lg">
            Learner
          </Link>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderNotes()}
      </div>
    );
  }
}

export default Resource;
