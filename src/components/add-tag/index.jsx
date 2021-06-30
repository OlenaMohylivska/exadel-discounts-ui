import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import * as axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const AddTag = () => {
  const [newTag, setNewTag] = useState({ name: "" })
  const [tags, setTags] = useState([])

  const fetchData = async (url, setter) => {
    axios.get(baseUrl + url).then((res) => setter(res.data))
  }

  useEffect(() => {
    fetchData("/api/tags", setTags)
  }, [tags])

  const postTag = () => {
    axios.post(baseUrl + "/api/tags", newTag)
    reset()
    fetchData()
  }

  const reset = () => {
    setNewTag({ name: "" })
  }

  const deleteTag = (id) => {
    axios.delete(`${baseUrl}/api/tags/${id}`)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex flex-lg-row flex-md-column flex-column justify-content-between mb-5">
            <div className="col-lg-6 col-md-12 p-2">
              <h3 className="my-4 text-center">Add new Tag</h3>
              <Form className="d-flex flex-row">
                <Form.Control
                  placeholder="Enter new tag"
                  value={newTag.name ? newTag.name : ""}
                  onChange={(e) => setNewTag({ name: e.target.value })}
                  type="text"
                  className="tag-input"
                />
                <Button className="ml-3" onClick={() => postTag()} variant="primary">
                  Submit
                </Button>
              </Form>
            </div>
            <div className="col-lg-6 col-md-12 p-2">
              <h3 className="my-4 text-center">All current Tags</h3>
              <div className="tags">
                {tags &&
                  tags.map((tag) => (
                    <div className="tag-container" key={tag.id}>
                      <div>{tag.name}</div>
                      <Button
                        variant="outline-dark"
                        onClick={() => deleteTag(tag.id)}>delete</Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTag