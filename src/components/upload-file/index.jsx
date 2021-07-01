import React, { useState } from "react"
import "./styles.scss"

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState()
  const [isSelected, setIsSelected] = useState(false)
  const [fileView, setFileView] = useState(null)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsSelected(true)
    setFileView(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <div className="upload-container">
      {isSelected ? (
        <div>
          <h6 className="file-name-title">Filename: {selectedFile.name}</h6>
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
          onChange={changeHandler}
        />
        <label className="label-for-img-loader" htmlFor="loader-for-img">
          Load img
        </label>
      </div>
    </div>
  )
}

export default FileUploadPage
