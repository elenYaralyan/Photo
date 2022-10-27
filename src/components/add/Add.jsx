import { useState } from "react";
import { useDispatch } from "react-redux"
import { addPhotoAsync } from "../../store/features/mainSlice";
import "../add/add.css"

const API_URL = "https://62e7898a93938a545bd3a5e4.mockapi.io/photo_js"

function Add({ isShown, setIsShown }) {
  const [item, setItem] = useState({
    name: "No Name",
    avatar: ""
  })
  const dispatch = useDispatch()

  async function getBaseUrl(e) {
    const file = e.target["files"][0];
    const reader = new FileReader();
    let baseString;
    reader.onloadend = await function () {
      baseString = reader.result;
      setItem({ ...item, avatar: baseString })
    };
    reader.readAsDataURL(file);
  }

  function close() {
    setIsShown(false)
  }

  const addElem = () => {
    if (item.avatar) {
      console.log(item);
      dispatch(addPhotoAsync({ API_URL, item }))
      close()
      setItem(" ")
    }
    close()
  }

  return (
    <>
      {
        isShown && (
          <div className="add-modal">
            <button className="close" onClick={() => close()}>Close</button>
            <div className="add-modal-wrapper">
              <img className="added-img" src={item.avatar} alt="" />
              <input
                className="added-name inp"
                type="text"
                defaultValue={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })} />
              <input
                className="choose-file inp"
                type="file"
                accept="image/*"
                onChange={(e) => getBaseUrl(e)} />
              <button className="save btn" onClick={addElem}>Save</button>
              <button className="cancel btn" onClick={() => close()}>Cancel</button>
            </div>
          </div>
        )
      }
    </>
  )
}
export default Add