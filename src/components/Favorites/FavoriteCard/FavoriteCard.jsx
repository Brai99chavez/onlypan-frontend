import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  changeAmountInCart,
  deleteFavorite,
} from '../../../redux/Actions/Actions';

function FavoriteCard({ user, image, name, id, price }) {
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    const { value: quantity } = await Swal.fire({
      title: `Agregar ${name} al carrito`,
      input: 'number',
      inputLabel: 'Seleccione la cantidad',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value || value === '0') {
          return 'Debe ingresar por lo menos uno';
        }
      },
    });
    if (quantity) {
      dispatch(
        changeAmountInCart(user.user.id, {
          id: id,
          quantity,
          totalPrice: price * quantity,
        })
      );
      Swal.fire({
        icon: 'success',
        title: 'Agregado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleDeleteFavorite = () => {
    Swal.fire({
      title: `Quieres eliminar ${name} de tus favoritos?`,
      showDenyButton: true,
      denyButtonText: `Si`,
      confirmButtonText: 'No',
    }).then((result) => {
      if (result.isDenied) {
        dispatch(deleteFavorite({ userId: user.user.id, id }));
      }
    });
  };

  return (
    <div className="flex justify-between items-center mt-6 pt-6 border-t-2">
      <div className="flex  items-center">
        <img src={image} width="80" alt="product" className="rounded-xl" />
        <div className="flex flex-col ml-3">
          <Link to={`/detail/${id}`}>
            <span className="md:text-md font-medium">{name}</span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="pr-8 flex ">
          <i
            onClick={handleAddToCart}
            className="fa-solid fa-cart-plus cursor-pointer fa-lg"
          />
          <i
            onClick={handleDeleteFavorite}
            className="fa-solid fa-trash-can cursor-pointer fa-lg ml-14 mr-32"
          />
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
