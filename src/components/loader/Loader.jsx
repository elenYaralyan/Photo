import { useSelector } from "react-redux";
import ReactLoading from "react-loading"
import "../loader/loader.css"

function Loader() {
  const loader = useSelector(state => state.photo)
  return (
    <>
      {loader.loading &&
        <ReactLoading className="loader" type={"spin"} color="#9A66F2" height={'10%'} width={'10%'} />}
    </>
  )
}

export default Loader