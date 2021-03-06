import React, { useState, useEffect, useMemo, useContext, memo } from "react"
import { Button, Col, Form, Row, Container } from "react-bootstrap"
import { Context } from "store/context"
import axiosInstance from "components/api"
import "./styles.css"
import FetchError from 'components/fetch-error'
import Select from "react-select"
import ToastElement from "components/toast"
import ErrorToast from "components/error-toast"

const Tools = () => {
  const { bindToken } = useContext(Context)
  //get
  const [categories, setCategories] = useState([])

  //post
  const [newCategory, setNewCategory] = useState({ name: "", tags: [] })

  //put
  const [category, setCategory] = useState(null)
  const [tag, setTag] = useState([])

  //error
  const [fetchError, setFetchError] = useState(null)

  //modal
  const [successMessage, setSuccessMessage] = useState(false)
  const [postError, setPostError] = useState(null)
  const [isErrorShown, setIsErrorShown] = useState(false)


  useEffect(() => {
    bindToken()
  }, [])

  const fetchData = async (url, setter) => {
    axiosInstance
      .get(url)
      .then((res) => setter(res.data))
      .catch((err) => setFetchError(err.message))
  }

  useEffect(() => {
    fetchData("/api/category", setCategories)
  }, [])

  const postCategory = () => {
    axiosInstance.post("/api/category", newCategory)
      .then(() => setNewCategory({ name: "", tags: [] }))
      .then(() => setSuccessMessage(true))
      .catch((err) => {
        setPostError(err.response.data.message)
        setIsErrorShown(true)
      })
      .finally(() => fetchData("/api/category", setCategories))
  }

  const updateCategory = () => {
    axiosInstance.put(`/api/category/${category.id}`,
      { ...category, tags: tag })
      .then(response => {
        setCategory({ ...category, tags: [...category.tags, ...response.data.tags] })
        setTag([])
      })
      .then(() => setSuccessMessage(true))
      .catch((err) => {
        setPostError(err.response.data.message)
        setIsErrorShown(true)
      })
      .finally(() => fetchData("/api/category", setCategories))
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
    setTag([{ name: e.target.value, categoryId: category.id }])
  }

  const newCategoryHandleChange = (e) => {
    setNewCategory({ ...newCategory, name: e.target.value })
  }

  const tagsByNewCategoryHandleChange = (e) => {
    setNewCategory({ ...newCategory, tags: e.target.value.split(",").map(tag => ({ name: tag })) })
  }

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && <Container className="my-4">
        <Row>
          <Col lg={6} md={12}>
            <div className="form-fields-container">
              <Form>
                <Form.Group className="category-form-field">
                  <Form.Label className="form-label-subtitle">Add new category</Form.Label>
                  <Form.Control
                    placeholder="New Category"
                    value={newCategory.name || ""}
                    onChange={newCategoryHandleChange}
                    type="text"
                    className="tag-input"
                  />
                </Form.Group>
                <Form.Group className="category-form-field">
                  <Form.Label>Enter tags, related to this category(split with ,)</Form.Label>
                  <Form.Control
                    placeholder="New tags"
                    value={newCategory.tags.map(tag => tag.name).join(",") || ""}
                    onChange={tagsByNewCategoryHandleChange}
                    type="text"
                    className="tag-input"
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    className="submit-btn"
                    variant="primary"
                    onClick={postCategory}
                    disabled={!newCategory.name.trim() || !newCategory.tags.map(tag => tag.name.trim()).join("")}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          <Col lg={6} md={12}>
            <div className="form-fields-container">
              <Form.Group className="category-form-field delete-category-form-field">
                <div className="w-100">
                  <Form.Label className="form-label-subtitle">All current categories</Form.Label>
                  <Select
                    options={categoriesOptions}
                    onChange={categoryHandleChange}
                    placeholder="Category"
                    value={category && { label: category.name, value: category.name }}
                  />
                </div>
              </Form.Group>

              <div className="all-tags-container">
                {category &&
                  category.tags.filter(el => el.name.trim() !== "").map((tag) => (
                    <div className="tag-container" key={tag.id}>
                      <div>{tag.name.trim()}</div>
                    </div>
                  ))}
              </div>
              <Form.Group className="category-form-field">
                <Form.Label>Enter tags, related to this category (one tag)</Form.Label>
                <Form.Control
                  placeholder="New tags"
                  value={tag.map(tag => tag.name) || ""}
                  onChange={tagsByCategoryHandleChange}
                  type="text"
                  className="tag-input"
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  className="submit-btn"
                  variant="primary"
                  onClick={updateCategory}
                  disabled={!tag.map(tag => tag.name.trim()).join("")}
                >
                  Update
                </Button>
              </div>
            </div>
            {successMessage && <ToastElement setSuccessMessage={setSuccessMessage} />}
            {isErrorShown && <ErrorToast setIsErrorShown={setIsErrorShown} errorMessage={postError} />}
          </Col>
        </Row>
      </Container>
      }
    </>
  )
}
export default memo(Tools)
