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
    <div>
      {isSelected ? (
        <div>
          <h6 className="file-name-title">Filename: {selectedFile.name}</h6>
          <img className="file-view" src={fileView} />
        </div>
      ) : (
        <img
          className="discount-img"
          src="https://thumbs.dreamstime.com/t/pizza-35669930.jpg"
        />
      )}
      <div>
        <input type="file" name="file" onChange={changeHandler} />
      </div>
    </div>
  )
}

export default FileUploadPage
