import React from 'react'

export default function List(props) {
  const { list, users } = props
  return (
    <div>
      <table>
        <thead>
          <tr>
              <td>项目名</td>
              <td>项目组</td>
              <td>项目负责人</td>
          </tr>
        </thead>
        <tbody>
          {
            list.map( item => {
              return (
                <tr key = {item.id}>
                    <td>{item.name}</td>
                    <td>{item.organization}</td>
                    <td>{users.find(user => user.id === item.personId)?.name || '未知'}</td>
                </tr>
              )
            })
          }     
        </tbody>
      </table>
    </div>
  )
}
