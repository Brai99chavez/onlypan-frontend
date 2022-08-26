import React, { useState } from 'react';

function CartCard({ image, name, price, setState, sumTotal, setTotal }) {
  const copyLocalStorage = JSON.parse(
    localStorage.getItem('cartSelectProducts')
  );
  const getAmountInCart = () => {
    const indexInCart = copyLocalStorage.findIndex((p) => p.name === name);
    let amountInCart = 0;
    if (indexInCart !== -1) {
      amountInCart = copyLocalStorage[indexInCart].quantitySelectedCartSh;
    }
    return amountInCart;
  };
  const [amountInCart, setAmountInCart] = useState(getAmountInCart());
  const handlerDeleteProduct = (name) => {
    const copyStateProductCart = JSON.parse(
      localStorage.getItem('cartSelectProducts')
    );
    const cleared = copyStateProductCart.filter((e) => e.name !== name);
    localStorage.setItem('cartSelectProducts', JSON.stringify(cleared));
    setState(cleared);
    setTotal(sumTotal());
  };
  const handleChangeAmount = (op) => {
    let quantity = amountInCart;
    op === 'suma' ? (quantity += 1) : (quantity -= 1);

    if (quantity > 0) {
      const prodIndex = copyLocalStorage.findIndex((p) => p.name === name);
      copyLocalStorage[prodIndex].quantitySelectedCartSh = quantity;
      localStorage.setItem(
        'cartSelectProducts',
        JSON.stringify(copyLocalStorage)
      );
      setAmountInCart(getAmountInCart());
      setTotal(sumTotal());
    }
  };
  return (
    <div className="flex justify-between items-center mt-6 pt-6">
      <div className="flex  items-center">
        <img src={image} width="80" alt="product" />
        <div className="flex flex-col ml-3">
          <span className="md:text-md font-medium">{name}</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="pr-8 flex ">
          <button
            onClick={() => handleChangeAmount('rest')}
            className="font-semibold cursor-pointer"
          >
            -
          </button>
          <input
            disabled
            type="text"
            className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
            value={amountInCart}
          />
          <button
            onClick={() => handleChangeAmount('suma')}
            className="font-semibold cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="pr-8 ">
          <span className="text-xs font-medium">${price}</span>
        </div>
        <div>
          <i
            onClick={() => handlerDeleteProduct(name)}
            className="fa-solid fa-trash-can text-xs font-medium cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default CartCard;
