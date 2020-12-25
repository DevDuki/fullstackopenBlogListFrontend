import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  errorMessage: PropTypes.string,
  notification: PropTypes.string
}

export default Notification