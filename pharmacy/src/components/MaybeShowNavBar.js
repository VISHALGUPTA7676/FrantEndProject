// Desc: This file contains the MaybeShowNavBar component. This component is used to show the navbar on all pages except the login page. This component is used in the App.js file.
// Date: 10/10/2021
// Programmer: Hong Dao
import React , {useEffect , useState} from 'react'
import { useLocation} from 'react-router-dom'


const MaybeShowNavBar = ({children}) => {
    const location = useLocation()
  
    const [showNavBar, setShowNavBar] = useState(false)

    useEffect(() => {
        console.log('this is location', location)
        if (location.pathname === '/') {
            setShowNavBar(false)
        } else {
            setShowNavBar(true)
        }
    }, [location])
  return (
    <div>{showNavBar &&children}
    </div>
  )
}

export default MaybeShowNavBar
