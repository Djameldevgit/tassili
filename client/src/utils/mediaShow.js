import { useDispatch } from "react-redux"
import { GLOBALTYPES } from "../redux/actions/globalTypes"
const dispatch = useDispatch
export const imageShow = (src ) => {
    return(
        <img src={src} alt="images" className="img-thumbnail"
        />
    )
}

export const videoShow = (src, theme) => {
    return(
        <video controls src={src} alt="images" className="img-thumbnail"
        style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
    )
}

 