import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllFavorites } from '../../redux/Actions/Actions';
import FavoriteCard from './FavoriteCard/FavoriteCard';

function Favorites() {
  let loggedUser =
    localStorage.getItem('user') !== '{}'
      ? JSON.parse(localStorage.getItem('user'))
      : false;

  const copyLocalStorageUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  useEffect(() => {
    if (loggedUser) {
      dispatch(getAllFavorites(copyLocalStorageUser.user.id));
    }
  }, [dispatch]);
  const { userFavorites } = useSelector((state) => state);

  return (
    <div className="h-100% bg-gray-300 my-28">
      <div className="py-12">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
          <div className="md:flex ">
            <div className="w-full p-4 px-5 py-5">
              <div className="col-span-2 p-5 ">
                <h1 className="text-xl font-medium">Mis favoritos</h1>
                {/* // productos   */}
                {loggedUser ? (
                  userFavorites && !userFavorites.length ? (
                    <div className="mt-4">
                      Aún no tenés productos en Favoritos
                    </div>
                  ) : (
                    userFavorites.length &&
                    userFavorites.map((e) => (
                      <FavoriteCard
                        user={copyLocalStorageUser}
                        image={e.image}
                        name={e.name}
                        id={e.id}
                        price={e.id}
                        key={e.id}
                      />
                    ))
                  )
                ) : (
                  <div className="mt-4">
                    Debe{' '}
                    <Link
                      className="text-sky-700  border-sky-700 border-b"
                      to={'/ingreso'}
                    >
                      iniciar sesión
                    </Link>{' '}
                    para agregar favoritos.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
