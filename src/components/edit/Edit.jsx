import { useDispatch } from "react-redux"
import { editPhotoAsync } from "../../store/features/mainSlice";
import "../add/add.css"

const API_URL = "https://62e7898a93938a545bd3a5e4.mockapi.io/photo_js"

function Edit({ edited, setEdited, show, setShow }) {
  const dispatch = useDispatch()

  function close() {
    setShow(!show)
  }

  async function getBaseUrl(e) {
    const file = e.target["files"][0];
    const reader = new FileReader();
    let baseString;
    reader.onloadend = await function () {
      baseString = reader.result;
      setEdited({ ...edited, avatar: baseString })
    };
    reader.readAsDataURL(file);
  }

  const editElem = () => {
    if (edited.avatar) {
      dispatch(editPhotoAsync({ API_URL, edited }))
      setEdited("")
    }
    close()
  }

  return (
    <>
      {show && (
        <div className="add-modal">
          <button className="close" onClick={close}>Close</button>
          <div className="add-modal-wrapper">
            <img className="added-img" src={edited.avatar} alt="" />
            <input
              className="added-name inp"
              type="text"
              defaultValue={edited.name}
              onChange={(e) => setEdited({ ...edited, name: e.target.value })}
            />
            <input
              className="choose-file inp"
              type="file"
              accept="image/*"
              onChange={getBaseUrl}
            />
            <button className="save btn" onClick={editElem} >Save</button>
            <button className="cancel btn" onClick={close}>Cancel</button>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Edit