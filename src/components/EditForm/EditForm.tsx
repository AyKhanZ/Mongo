import React from 'react'

const EditForm = ({name, desc, img, type, setName, setDesc, setImg, setType}: any) => {

  return (
    <div>
        <input type="text" value={name} />
        <input type="text" value={desc} />
        <input type="text" value={img} />
        <input type="text" value={type} />
    </div>
  )
}

export default EditForm