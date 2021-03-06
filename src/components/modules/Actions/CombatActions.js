import React from 'react'

const CombatActions = (props) => {

  return (
    <div className="action-buttons">
      <button 
        className="button action-button"
        onClick={() => props.attack()}
      >Fight</button>
      <button 
        className="button action-button"
      >Use Item</button>
      <button 
        className="button action-button"
      >Run</button>
    </div>
  )
}

export default CombatActions