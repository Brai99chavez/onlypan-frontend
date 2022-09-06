import React, { useEffect } from 'react';
import './ProductDetail.css';
import Loading from '../../Loading/Loading';
import Error from '../../Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import {
  addScore,
  getProductForId,
  getScoresForProduct,
  getScoresForUserAndProduct,
  updateScore,
} from '../../../redux/Actions/Actions';

function ProductDetail({ match }) {
  const { id } = match.params;
  const { detailProduct, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  let session_id =
    localStorage.getItem('user') !== '{}'
      ? JSON.parse(localStorage.getItem('user'))
      : false;

  const userId = session_id ? session_id.user.id : false;
  const { getOneScore, getProductScores } = useSelector((state) => state);

  useEffect(() => {
    if (userId) {
      dispatch(getScoresForUserAndProduct(userId, id));
    }
    dispatch(getProductForId(id));
    dispatch(getScoresForProduct(id));
  }, [dispatch, id, userId]);

  console.log(getProductScores);
  function stars(oneScore) {
    let score = oneScore; //2
    let array = [];
    for (let i = 0; i < score; i++) {
      array.push('star');
    }
    let faltantes = 5 - score;
    for (let i = 0; i < faltantes; i++) {
      array.push('not star');
    }
    return array;
  }

  let VisibleStars = stars(getOneScore);

  function changeStars(value, userId, productId) {
    if (getOneScore === 0) {
      dispatch(addScore(value, userId, productId));
      window.location.reload();
    } else {
      dispatch(updateScore(value, userId, productId));
      window.location.reload();
    }
  }

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="detailContainer">
      {detailProduct.id && (
        <div className="detail">
          <h1>{detailProduct.name}</h1>
          <img src={detailProduct.image} alt="pan de trigo" />
          <div className="puntaje">
            {session_id
              ? VisibleStars
                ? VisibleStars.map((s, i) => (
                    <button
                      key={i}
                      onClick={(e) => changeStars(i + 1, userId, parseInt(id))}
                    >
                      <i
                        className={`${
                          s === 'star' ? 'fa-solid' : 'fa-regular'
                        }  fa-star my-start`}
                      />
                    </button>
                  ))
                : null
              : null}
            <p> valoracion: {getProductScores >0? getProductScores+"/5" : "no Hay"}</p>
          </div>

          <p>
            <strong>Precio:</strong> ${detailProduct.price}
          </p>
          <p>
            <strong>Stock:</strong> {detailProduct.quantity}
          </p>
          <p>
            <strong>Tipo: </strong>
            {detailProduct.type[0].toUpperCase() +
              detailProduct.type.substring(1).toLowerCase()}
          </p>
          <p>
            <strong>Descripcion:</strong> {detailProduct.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
