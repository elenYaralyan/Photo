import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePhotoAsync, getPhotosAsync } from "../../store/features/mainSlice"
import { v4 as uuid } from "uuid";
import "../main/main.css"
import Add from "../add/Add";
import Edit from "../edit/Edit";

const API_URL = "https://62e7898a93938a545bd3a5e4.mockapi.io/photo_js"

function Main() {
  const photo = useSelector((state) => state.photo)
  const [isShown, setIsShown] = useState(false)
  const [show, setShow] = useState(false)
  const [edited, setEdited] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPhotosAsync(API_URL))
  }, [dispatch])

  function addItem() {
    setIsShown(!isShown)
  }
  
  function editItem(item) {
    if (!photo.loading)
      setShow(!show)
    setEdited(item)
  }

  return (
    <>
      {isShown && <Add isShown={isShown} setIsShown={setIsShown} />}
      {show && <Edit edited={edited} setEdited={setEdited} show={show} setShow={setShow} />}
      <div className="wrapper">
        {photo.data.map((item) =>
          <div className="photos-item-wrapper" key={uuid()}>
            <img className="photos-item-img" src={item.avatar} alt="person-img" />
            <p className="photos-item-name">{item.name}</p>
            <img
              className="img edit"
              src="https://api.iconify.design/material-symbols:edit.svg?color=%23928b9c"
              alt="edit"
              onClick={() => editItem(item)} />
            <img
              className="img delete"
              src="https://api.iconify.design/material-symbols:delete-forever.svg?color=%23928b9c"
              alt="delete"
              onClick={() => !photo.loading && dispatch(deletePhotoAsync({ API_URL, item }))} />
          </div>)}
        <button className="add-btn" disabled={show} onClick={addItem}> Add Photo</button>
      </div>
    </>
  )
}

export default Main