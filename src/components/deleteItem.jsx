import { useState, useContext } from "react";
import "../index.css"

export default function ConfirmDelete({ children }) {
    const [ isDeleting, setIsDeleting ] = useState(false)

    const handleDelete = (dltItem) => {
        setIsDeleting (prevIsDeleting => {
            const item = prevIsDeleting.find(item => item.id === dltItem.id)
        })
    }
}