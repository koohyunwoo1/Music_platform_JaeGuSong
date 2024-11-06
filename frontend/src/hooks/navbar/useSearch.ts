import { useState } from "react"

const useSearch = () => {
    const [ openSearchModal, setOpenSearchModal ] = useState<boolean>(false);


    return {
        openSearchModal,
        setOpenSearchModal
    }
}

export default useSearch();