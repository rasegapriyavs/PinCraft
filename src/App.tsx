import { ChangeEvent, useRef, useState } from 'react'

const boards = ['Select a board (coming soon)', 'Home inspiration', 'Recipes to try', 'Travel ideas']

function App() {
  const [imageName, setImageName] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [imageError, setImageError] = useState('')
  const imageInput = useRef<HTMLInputElement>(null)
  const imageSelection = useRef(0)

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const selectionId = ++imageSelection.current
    const image = event.target.files?.[0]

    if (!image) {
      resetImage()
      return
    }

    const isSupportedImage = image.type === 'image/png' || image.type === 'image/jpeg'
    const isWithinSizeLimit = image.size <= 20 * 1024 * 1024

    if (!isSupportedImage || !isWithinSizeLimit) {
      resetImage()
      setImageError(!isSupportedImage ? 'Please choose a PNG or JPG image.' : 'Image files must be 20 MB or smaller.')
      return
    }

    // A data URL lets the browser show a local image immediately, without uploading it.
    const reader = new FileReader()
    reader.onload = () => {
      // Ignore an older file if the user has already chosen another one.
      if (selectionId === imageSelection.current) setImagePreview(String(reader.result))
    }
    reader.readAsDataURL(image)
    setImageName(image.name)
    setImageError('')
  }

  function resetImage() {
    imageSelection.current += 1
    setImageName('')
    setImagePreview('')
    if (imageInput.current) imageInput.current.value = ''
  }

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <a className="brand" href="#top" aria-label="PinCraft home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>PinCraft</span>
        </a>
        <div className="hero-copy">
          <p className="eyebrow">Your Pin, thoughtfully made</p>
          <h1 id="page-title">Create your next great Pin.</h1>
          <p>Gather the essentials here. Publishing will be ready when your Pinterest account is connected.</p>
        </div>
        <div className="progress-pill"><span aria-hidden="true">1</span> Create</div>
      </section>

      <section className="composer" aria-label="Pin details" id="top">
        <div className="section-heading">
          <div>
            <p className="eyebrow">New Pin</p>
            <h2>Bring your idea to life</h2>
          </div>
          <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
        </div>

        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-grid">
            <div className="upload-column">
              <label className="upload-area" htmlFor="pin-image">
                {imagePreview ? (
                  <>
                    <img className="image-preview" src={imagePreview} alt={`Preview of ${imageName}`} />
                    <span className="preview-action">Choose another image</span>
                  </>
                ) : (
                  <>
                    <span className="upload-icon" aria-hidden="true">↑</span>
                    <span className="upload-title">Upload an image</span>
                    <span className="upload-hint">PNG or JPG, up to 20 MB</span>
                    <span className="upload-action">Choose file</span>
                  </>
                )}
                <input ref={imageInput} id="pin-image" type="file" accept="image/png,image/jpeg" onChange={handleImageChange} />
              </label>
              {imageName && <p className="file-name">Selected: {imageName}</p>}
              {imageError && <p className="image-error" role="alert">{imageError}</p>}
              {imagePreview && <button className="remove-image" type="button" onClick={resetImage}>Remove image</button>}
            </div>

            <div className="fields-column">
              <label htmlFor="title">Title <span aria-hidden="true">*</span></label>
              <input id="title" name="title" type="text" placeholder="Give your Pin a memorable title" required />

              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows={4} placeholder="Tell people a little more about your idea" />

              <label htmlFor="destination">Destination link</label>
              <input id="destination" name="destination" type="url" placeholder="https://yourwebsite.com" />

              <label htmlFor="board">Board <span className="label-soon">Coming soon</span></label>
              <select id="board" name="board" defaultValue="Select a board (coming soon)" disabled>
                {boards.map((board) => <option key={board}>{board}</option>)}
              </select>
            </div>
          </div>

          <div className="form-footer">
            <p><span className="status-dot" aria-hidden="true" />Pinterest publishing is coming soon.</p>
            <button type="submit" disabled title="Pinterest publishing is coming soon">Post to Pinterest <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </section>

      <p className="footer-note">
        PinCraft is your calm space to plan what you’ll share next. <a href={`${import.meta.env.BASE_URL}privacy-policy.html`}>Privacy Policy</a>
      </p>
    </main>
  )
}

export default App
