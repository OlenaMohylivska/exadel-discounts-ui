/*eslint-disable*/
import React, { useState, useEffect, useMemo } from "react"
import { Button, Col, Form, Row, Container } from "react-bootstrap"
import axiosInstance from "components/api"
import "./styles.css"
import FetchError from 'components/fetch-error'
import Select from "react-select"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const Tools = () => {
  //get
  const [categories, setCategories] = useState([])

  //post
  const [newCategory, setNewCategory] = useState({ name: "", tags: [] })

  //put
  const [category, setCategory] = useState(null)
  const [tags, setTags] = useState([])


  const [fetchError, setFetchError] = useState(null)

  const fetchData = async (url, setter) => {
    axiosInstance.get(url).then((res) => setter(res.data))
      .catch(err => setFetchError(err.message))
  }

  useEffect(() => {
    fetchData("/api/category", setCategories)
  }, [])

  const postTag = () => {
    axiosInstance.post(baseUrl + "/api/tags", newTag)
    reset()
    fetchData()
  }
  const postCategory = () => {
    axiosInstance.post("/api/category", newCategory)
      .then(() => setNewCategory({ name: "", tags: [] }))
      .then(() => fetchData("/api/category", setCategories))

    // fetchData()
  }


  const deleteCategory = () => {
    // setCategory({...category, tags: []})
    axiosInstance.delete(`/api/category/${category.id}`)
      .then(() => setCategory({ name: "", tags: [] }))
      .then(() => fetchData("/api/category", setCategories))

  }
  const deleteTag = (id) => {
    setCategory({ ...category, tags: category.tags.filter(tag => tag.id !== id) })
    console.log(category)
  }

  const updateCategory = () => {
    console.log(category)
    console.log(tags)
    // setCategory({...category, tags: [...category.tags, tags]})
    console.log({ ...category, tags: [...category.tags, ...tags] })
    axiosInstance.put(`/api/category/${category.id}`,
     { ...category, tags: [...category.tags, ...tags] })
      .then(() => setCategory({ name: "", tags: [] }))
      .then(() => fetchData("/api/category", setCategories))
  }

  const categoriesOptions = useMemo(() => {
    return (
      categories.length > 0 &&
      categories.map((category) => ({
        ...category,
        label: category.name,
        value: category.name,
      }))
    )
  }, [categories])



  const categoryHandleChange = (e) => {
    setCategory({ name: e.name, id: e.id, tags: e.tags })
  }

  const tagsByCategoryHandleChange = (e) => {
    setTags(e.target.value.split(";").map(tag => ({ name: tag, categoryId: category.id })))
  }
  const newCategoryHandleChange = (e) => {
    setNewCategory({ ...newCategory, name: e.target.value })
  }

  const tagsByNewCategoryHandleChange = (e) => {
    setNewCategory({ ...newCategory, tags: e.target.value.split(";").map(tag => ({ name: tag })) })
  }

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && <Container>
        <Row>
          <Col>
            <div className="my-4">
                <Form>
                  <Form.Group className="p-3">
                    <Form.Label>Add new Category</Form.Label>
                    <Form.Control
                      placeholder="New Category"
                      value={newCategory.name || ""}
                      onChange={newCategoryHandleChange}
                      type="text"
                      className="tag-input"
                    />
                  </Form.Group>
                  <Form.Group className="p-3">
                    <Form.Label>Enter tags, related to this category(split with ';')</Form.Label>
                    <Form.Control
                      placeholder="New tags"
                      value={newCategory.tags.map(tag => tag.name).join(";") || ""}
                      onChange={tagsByNewCategoryHandleChange}
                      type="text"
                      className="tag-input"
                    />
                  </Form.Group>
                  <Button className="ml-3" variant="primary" onClick={postCategory}>
                    Submit
                  </Button>
                </Form>
            </div>
          </Col>

          <Col className="col-lg-6 col-md-12 tag-container">
                <h4 className="my-4 text-center">All current categories </h4>
                <Select
                  options={categoriesOptions}
                  onChange={categoryHandleChange}
                  placeholder="Category"
                  value={category && { label: category.name, value: category.name }}
                />
                <Button
                  variant="outline-dark"
                  onClick={() => deleteCategory()}>Delete cat
                </Button>
                <div className="tags">
                  {category &&
                    category.tags.map((tag) => (
                      <div className="tag-wrapper" key={tag.id}>
                        <div>{tag.name}</div>
                        <Button
                          variant="outline-dark"
                          onClick={() => deleteTag(tag.id)}>Delete
                        </Button>
                      </div>
                    ))}
                  <Form.Group>
                    <Form.Label>Enter tags, related to this category(split with ';')</Form.Label>
                    <Form.Control
                      placeholder="New tags"
                      value={tags && tags.map(tag => tag.name).join(";") || ""}
                      onChange={tagsByCategoryHandleChange}
                      type="text"
                      className="tag-input"
                    />
                  </Form.Group>
                  <Button
                    variant="outline-dark"
                    onClick={() => updateCategory()}>Submit changes
                  </Button>
                </div>
              </Col>
        </Row>
      </Container>
      }
    </>

    //   <>
    //     <Form className="d-flex flex-row">
    //       <Form.Control
    //         placeholder="Enter new tag"
    //         value={newTag.name || ""}
    //         onChange={(e) => setNewTag({ name: e.target.value })}
    //         type="text"
    //         className="tag-input"
    //       />
    //       <Button className="ml-3" onClick={() => postTag()} variant="primary">
    //         Submit
    //       </Button>
    //     </Form>
    //     <Form className="d-flex flex-row">
    //       <Form.Control
    //         placeholder="Enter new category"
    //         value={newCategory.name || ""}
    //         onChange={(e) => setNewCategory({ name: e.target.value, tags: [] })}
    //         type="text"
    //         className="tag-input"
    //       />
    //       <Button className="ml-3" onClick={() => postCategory()} variant="primary">
    //         Submit
    //       </Button>
    //     </Form>
    // <Select
    //   options={categoriesOptions}
    //   onChange={categoryHandleChange}
    //   placeholder="Category"
    //   isMulti
    // />
  )
}

export default Tools
