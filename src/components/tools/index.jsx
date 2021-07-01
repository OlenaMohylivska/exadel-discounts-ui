import { Button, Form, Toast } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as axios from "axios";
import "./styles.css";

const pics = ["pic1", "pic2", "pic3", "pic4"];
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

const Tools = () => {
  const [newTag, setNewTag] = useState({ name: "" });
  const [tags, setTags] = useState(null);
  const [tagsError, setTagsError] = useState(null);
  const [tagsPostError, setTagsPostError] = useState({
    error: null,
    show: false,
  });

  const fetchData = async (url, setter) => {
    try {
      await axios.get(baseUrl + url).then((res) => setter(res.data));
    } catch (e) {
      setTagsError(e.message);
    }
  };

  useEffect(() => {
    fetchData("/api/tags", setTags);
  }, [tags]);

  const postTag = async () => {
    try {
      await axios.post(baseUrl + "/api/tags", newTag);
      reset();
      fetchData();
    } catch (e) {
      setTagsPostError({ error: e.message, show: true });
    }
  };

  const reset = () => {
    setNewTag({ name: "" });
  };

  return (
    <div className="tool-container">
      <div>
        <Form>
          <Toast
            show={tagsPostError.show}
            autohide
            onClose={() => {
              setTagsPostError({ show: false, error: null });
            }}
          >
            <Toast.Body>{tagsPostError.error}</Toast.Body>
          </Toast>

          <h4> Here You may add new Tag </h4>
          <Form.Control
            placeholder="new tag"
            value={newTag.name ? newTag.name : ""}
            onChange={(e) => setNewTag({ name: e.target.value })}
            type="text"
          />
          <br />
          <Button onClick={() => postTag()} variant="primary">
            Submit
          </Button>
        </Form>
        <div className="tags">
          <h4>Here you see all current Tags</h4>
          {tags ? (
            tags.map((tag) => (
              <div className="tag-container" key={tag.id}>
                <div>{tag.name}</div>
                <Button variant="outline-dark">delete</Button>
              </div>
            ))
          ) : (
            <div className="fetch-tags-error">Sorry, no info, {tagsError}</div>
          )}
        </div>
      </div>
      <Form>
        <h4>You may update slider here</h4>
        <div>
          <h5>Current pics</h5>
          <div className="pics-list">
            {pics.map((pic) => (
              <div className="list-elem" key={pic}>
                {pic} <Button variant="primary">update</Button>{" "}
                <Button variant="outline-dark">delete</Button>
              </div>
            ))}
            <Button
              className="btn-correction"
              size="lg"
              variant="outline-primary"
            >
              Add one more pics
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Tools;
