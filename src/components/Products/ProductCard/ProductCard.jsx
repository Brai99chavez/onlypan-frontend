import React from 'react'
import "./ProductCard.css"

export default function ProductCard({name,price,image,description,type}) {
  return (
    <div className="ProductCard">
      <div className='ProductCardImage'>
          <img src={image} alt="Sunset in the mountains"/>
      </div>
      <div className="ProductCardDetails">
        <p className="ProductCardTittle">{name}</p>
        <div className="ProductCardDescription">
          <p>${price}</p> 
          <span className="ProductCardtype">categoria: {type}</span>
        </div>
      </div>
      <div className="ProductCardButtons">
          <div className="ProductCardQuantity">
              <button className="ProductCardQuantityButton">+</button>
              <p>0</p>
              <button className="ProductCardQuantityButton">-</button>
          </div>
          <button className="ProductCardButton">
          <i className="fa-solid fa-cart-plus"></i>
          </button>
      </div>
      <div className="ProductCardSeeMore">
        <button className="ProductCardSeeMoreButton">Ver mas</button>
      </div>
    </div>
  )
}
