import { useNavigate } from 'react-router-dom'

function useCustomRouter() {
    const navigate = useNavigate()
    const pushQuery = (query)=>{
        const newQuery = new URLSearchParams(query).toString()
        navigate(`?${newQuery}`)
    }
  return {pushQuery}
}
export default useCustomRouter