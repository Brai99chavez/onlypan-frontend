import React, { useEffect } from 'react';
import './ProductDetail.css';
import Loading from '../../Loading/Loading';
import Error from '../../Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { getForId } from '../../../redux/Actions/Actions';

function ProductDetail({ match }) {
  const { id } = match.params;
  const { detailProduct, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForId(id));
  }, [dispatch, id]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="detailContainer">
      {detailProduct.id && (
        <div className="detail">
          <h1>{detailProduct.name}</h1>
          <img src={detailProduct.image} alt="pan de trigo" />
          <p>
            <strong>Precio:</strong> {detailProduct.price}
          </p>
          <p>
            <strong>Tipo:</strong>
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
