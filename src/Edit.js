import React, { useState, useRef } from "react";
import JoditEditor from 'jodit-react'

const Edit = ({setValue})=>{
    const editor = useRef(null);
    return<JoditEditor ref={editor} onChange={(content)=>setValue(content)}/>
}


export default Edit;