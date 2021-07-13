import React, { useState } from "react"
import axiosInstance from "components/api"
import PropTypes from "prop-types"
import "./styles.scss"
import PropTypes from "prop-types"
import axiosInstance from "components/api"

function FileUploadPage({setFileId }) {
  const [selectedFile, setSelectedFile] = useState({})
  const [isSelected, setIsSelected] = useState(false)
  const [fileView, setFileView] = useState(null)

  const changeHandler = (event) => {
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append("file", file)
    axiosInstance
      .post("api/images", formData)
      .then((res) => setFileId(res.data))
    setIsSelected(true)
    setSelectedFile(event.target.files[0])
    setFileView(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <div className="upload-container">
      {isSelected ? (
        <div>
          <img className="file-view" src={fileView} />
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
  setFileId: PropTypes.func,
}

