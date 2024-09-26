import React,{useState,useEffect} from 'react'

const CenterBanner=({imageUrl,altText,aspectRatio})=>{
    console.log('recieved aspect ratio',aspectRatio)
    const [recievedAspectRatio,setRecievedAspectRatio]=useState(aspectRatio)
    return (
        <div className='w-full relative ' style={{aspectRatio:recievedAspectRatio }}>
            <img
                src={imageUrl || '/static/images/cards/default-image.jpg'}
                alt={altText}
                className="w-full h-full object-cover" // or 'object-contain' based on your design
            />
        </div>
    )
}
export default CenterBanner