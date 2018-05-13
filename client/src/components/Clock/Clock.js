import React from 'react'

export default (props) => {
    let time = new Date(props.date);
  return (
    <div>
          {(time - (new Date()))}
    </div>
  )
}
