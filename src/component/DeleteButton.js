import { BsTrashFill } from "react-icons/bs"

const DeleteButton = (props)=>{

    return<span onClick={props.onClick}>
        <BsTrashFill size={16}/>
    </span>

}

export default DeleteButton;