import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProducts, getTypes } from "../../redux/Actions/Actions";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import Slideshow from "../Slideshow/Slideshow";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, user } = useAuth0();
  const { types, loading, error } = useSelector((state) => state);
  const controlCart = JSON.parse(localStorage.getItem("cartSelectProducts"));
  const controlFavs = JSON.parse(localStorage.getItem("favoritesSelected"));

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getTypes());

    if (!controlCart)
      localStorage.setItem("cartSelectProducts", JSON.stringify([]));

    if (!controlFavs)
      localStorage.setItem("favoritesSelected", JSON.stringify([]));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const userLogged = async () => {
        const { given_name, email } = user;
        localStorage.setItem(
          "user",
          JSON.stringify({ name: given_name, email: email })
        );
        
        await axios
          .post("/user/google", JSON.parse(localStorage.getItem("user")))
          .then((res) => {
            console.log(res);
          });
          // .then(() => {
          //   Swal.fire({
          //     icon: "success",
          //     title: `Bienvenido/a de vuelta, ${email}!`,
          //     showConfirmButton: false,
          //     timer: 2000,
          //   });
          // })
          // .catch((error) => {
          //   Swal.fire({
          //     icon: "error",
          //     title: "No se pudo iniciar sesión.",
          //     text: error.response.data.msg,
          //   });
          // });
      };
      return userLogged();
    }
  }, [isAuthenticated, user]);

  const handleOnClick = (t) => {
    history.push(`/productos?tipo=${t}`);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="homeContainer">
      <SearchBar />
      <div className="categories">
        {types &&
          types.map((t, i) => (
            <button
              className="categoryButton"
              key={i}
              onClick={() => handleOnClick(t)}
            >
              {t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()}
            </button>
          ))}
      </div>
      <Slideshow />
    </div>
  );
}
