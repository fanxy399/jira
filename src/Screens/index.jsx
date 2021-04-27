
import {useState, useEffect} from 'react'
import qs from 'querystring'
import {cleanObject} from 'utils'
import List from 'Screens/List'
import Search from 'Screens/Search'

export default function Screens() {
  const api = process.env.REACT_APP_API_URL
  const [search, setSearch] = useState({
    name:'',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${api}/projects?${qs.stringify(cleanObject(search))}`).then( async res => {
      if(res.ok) setList(await res.json())
    })
  }, [api, search])

  useEffect(() => {
    fetch(`${api}/users`).then(async res => {
      if(res.ok) setUsers(await res.json())
    })
  }, [api])

  return (
    <div>
      <Search search={search} setSearch={setSearch} users={users}/>
      <List list={list} users={users}/>
    </div>
  )
}
