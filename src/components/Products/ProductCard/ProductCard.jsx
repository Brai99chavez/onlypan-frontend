import React from 'react'
import "./ProductCard.css"

export default function ProductCard({name,price,image,description,type}) {
  return (
    <div class="ProductCard">
      <div className='ProductCardImage'>
          <img src={image} alt="Sunset in the mountains"/>
      </div>
      <div class="ProductCardDetails">
        <p class="ProductCardTittle">{name}</p>
        <p class="ProductCardDescription">
          <p>${price}</p> <br />
          <span class="ProductCardtype">categoria: {type}</span>
        </p>
      </div>
      <div class="ProductCardTypes">
        <span class="ProductCardtype">#uwu</span>
        <span class="ProductCardtype">#tkm</span>
      </div>
    </div>
  )
}
