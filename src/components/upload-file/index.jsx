import React, { useState, useEffect } from "react"
import axiosInstance from "components/api"
import PropTypes from "prop-types"
import "./styles.scss"


function FileUploadPage({ imageName, setImageName, requestIsDone, setRequestIsDone, isEdit }) {
  const [isSelected, setIsSelected] = useState(false)
  const [fileView, setFileView] = useState(null)

  const changeHandler = (event) => {
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append("file", file)
    axiosInstance
      .post("api/images", formData)
      .then((res) => {
        setImageName(res.data)
      })
    setRequestIsDone(false)
    setIsSelected(true)
    setFileView(URL.createObjectURL(event.target.files[0]))
    console.log(event.target.files[0])
    console.log(fileView)
  }

  useEffect(() => {
    if (isEdit) {
      console.log(imageName)
      axiosInstance
        .get(`api/images/${imageName}`)
        .then((res) => {
          console.log(res.data)
          setFileView((res.data))
        })
    }

  }, [imageName])

  console.log(fileView)
  return (
    <div className="upload-container">
      {isSelected ? (
        <div>
          <img className="file-view" src={requestIsDone ? null : fileView} />
        </div>
      ) : (
        <img
          className="default-img"
          src="http://damadex.com.ng/wp-content/uploads/2020/05/default-placeholder.png"
        />
      )}
      <div className="img-loader">
        <input
          id="loader-for-img"
          type="file"
          name="file"
          onChange={(e) => changeHandler(e)}
        />
        <label className="label-for-img-loader" htmlFor="loader-for-img">
          Load img
        </label>
      </div>
    </div>
  )
}

export default FileUploadPage

FileUploadPage.propTypes = {
  setImageName: PropTypes.func,
  requestIsDone: PropTypes.bool,
  setRequestIsDone: PropTypes.func,
  isEdit: PropTypes.bool,
  imageName: PropTypes.bool
}

