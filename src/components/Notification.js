import React from 'react'

const Notification = ({ errorMessage, notification }) => {
  if(!errorMessage && !notification){
    return null
  }

  if(errorMessage){
    return (
      <div className='notifications error'>
        {errorMessage}
      </div>
    )
  } else if(notification){
    return (
      <div className='notifications notification'>
        {notification}
      </div>
    )
  }
}

export default Notification