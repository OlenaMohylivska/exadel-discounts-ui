import React, { useState, useEffect } from "react"
import { Image } from "react-bootstrap"
import { XLg, Download } from "react-bootstrap-icons"
import Image1 from "../../assets/1.jpg"
import Image2 from "../../assets/2.jpg"
import Image3 from "../../assets/3.jpg"
import "./styles.scss"

const EditSlider = () => {
  const sliderImages = [Image1, Image2, Image3]
  const [images, setImages] = useState(sliderImages)
  const [fileImage, setFileImage] = useState("")

  const onAddImage = (event) => {
    setFileImage(URL.createObjectURL(event.target.files[0]))
  }

  useEffect(() => {
    if (fileImage) {
      setImages((images) => [...images, fileImage])
    }
  }, [fileImage])

  const deleteImage = (index) => {
    setImages((images) => {
      const newState = [...images]
      newState.splice(index, 1)
      return newState
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex justify-content-center my-3">
            <div>
              <div className="input-wrapper">
                <input
                  type="file"
                  name="file"
                  id="input-file"
                  className="input-file"
                  onChange={onAddImage}
                />
                <label htmlFor="input-file" className="input-button">
                  <span className="icon-wrapper">{<Download />}</span>
                  <span className="button-text">Choose image</span>
                </label>
              </div>
            </div>
          </div>
          <div className="images-wrapper">
            {images.map((image, index) => {
              return (
                <div
                  className="d-inline position-relative image-wrapper"
                  key={index}
                >
                  <Image src={image} className="p-2 slider-image" />
                  <XLg
                    className="delete-icon"
                    onClick={() => deleteImage(index)}
                  />
                </div>
              )
            })}
            {images.length !== 0 ? null : (
              <h5 className="text-center mt-3">No images found</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSlider
