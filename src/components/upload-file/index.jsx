import React, { useContext, useState, useEffect } from "react"
import axiosInstance from "components/api"
import PropTypes from "prop-types"
import "./styles.scss"
import { Context } from "store/context"
import { Download } from "react-bootstrap-icons"
import Image from "../../assets/no-image.png"
function FileUploadPage({ setNameImage, image, isEditable }) {
  const [isSelected, setIsSelected] = useState(false)
  const [fileView, setFileView] = useState(null)
  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])

  const changeHandler = (event) => {
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append("file", file)
    axiosInstance
      .post("api/images", formData)
      .then((res) => setNameImage(res.data))
    setIsSelected(true)
    fileView
    setFileView(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <div className="upload-container">
      {image && (
        <div>
          <img
            className="file-view"
            src={`https://sandbox-team5.herokuapp.com/api/images/${image}`}
          />
        </div>
      )}
      { !image && !isSelected && isEditable &&  (
        <img className="default-img" src={Image} />
      )}

      <div>
        <input
          id="loader-for-img"
          type="file"
          name="file"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="loader-for-img" className="input-button">
          <span className="icon-wrapper">{<Download />}</span>
          <span className="button-text">Choose image</span>
        </label>
      </div>
    </div>
  )
}

export default FileUploadPage

FileUploadPage.propTypes = {
  setNameImage: PropTypes.func,
  image:PropTypes.string,
  isEditable: PropTypes.bool
}
