import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import CartCard from "./CartCard/CartCard";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { data } from "autoprefixer";

export default function Cart() {
  const [nameCard, setNameCard] = useState("");
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("cartSelectProducts"))
  );
  const copyLocalStorage = JSON.parse(
    window.localStorage.getItem("cartSelectProducts")
  );
 
  const [loadingsti, setLoadingsti] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const expresiones = {
    numeros: / *([.0-9])*\d/g, //eslint-disable-line
    caracteresEs: /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/g, //eslint-disable-line
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, //eslint-disable-line
    instru: /^[a-zA-Z0-9_-\s]{4,200}$/, //eslint-disable-line
    numPosi: /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/gm,
  };
  const errorMessages = {
    generic_decline: "Tarjeta inválida.",
    incorrect_number: "El número de tarjeta es incorrecto.",
    invalid_number:
      "El número de tarjeta es un número de tarjeta de crédito inválido.",
    invalid_expiry_month: "El mes de vencimiento de la tajerta es inválido.",
    invalid_expiry_year: "El año de vencimiento de la tajerta es inválido.",
    invalid_cvc: "El código de seguridad de la tarjeta es inválido.",
    expired_card: "La tarjeta está vencida.",
    incorrect_cvc: "El código de seguridad de la tarjeta es incorrecto.",
    card_declined: "La tarjeta fue rechazada.",
    missing: "There is no card on a customer that is being charged.",
    processing_error: "Ocurrió un error en el procesamiento de la tarjeta.",
    insufficient_funds: "Fondos insuficientes",
  };
  const errorAlert = (err) => {
    Swal.fire({
      icon: "error",
      title: "Su transaccion fue rechazada",
      text: err,
    });
  };
  const loadingPayment = () => {
    Swal.fire({
      title: "Por favor espera!",
      html: "cargando pago", // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  };
  const successPaymentAprobed = () => {
    Swal.fire({
      //position: "top-end",
      icon: "success",
      title: "Pago aprobado",
      showConfirmButton: false,
      timer: 1500,
    });
    elements.getElement(CardCvcElement).clear();
    elements.getElement(CardExpiryElement).clear();
    elements.getElement(CardNumberElement).clear();
  };

  const validationName = (name) => {
    if (name.length >= 20) {
      return "Nombre muy largo";
    }
    if (expresiones.caracteresEs.test(name)) {
      return "no pueden haber caracteres especiales";
    }
    if (expresiones.numeros.test(name)) {
      return "no pueden ser numeros";
    }
  };
  const errorMsgName = validationName(nameCard);

  const idProducts = copyLocalStorage.map((e) => {
    return {
      id: e.id,
      quantity: e.quantitySelectedCartSh,
    };
  });
  const idUser = "estoesnuestro";
  const obj = {
    idProducts,
    idUser,
  };

  const sumTotal = () => {
    return JSON.parse(localStorage.getItem("cartSelectProducts")).reduce(
      (a, b) => {
        return a + b.price * b.quantitySelectedCartSh;
      },
      0
    );
  };
  const [total, setTotal] = useState(sumTotal());

  const handlerSummit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    setLoadingsti(true);
    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post("/payment", {
        error: error,
        id,
        amount: total,
        obj: obj,
      });
      const errormesa = errorMessages[data.error];
      data.error ? errorAlert(errormesa) : successPaymentAprobed();
    }
    setLoadingsti(false);
  };

  return (
    <div className="h-100% bg-gray-300 my-28">
      <div className="py-12">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
          <div className="md:flex ">
            <div className="w-full p-4 px-5 py-5">
              <div className="md:grid md:grid-cols-3 gap-2 ">
                {/* carrito */}
                <div className="col-span-2 p-5 ">
                  <h1 className="text-xl font-medium">Mi carrito</h1>
                  {/* // productos   */}
                  <div className="overflow-y-auto h-96">
                    {state.map((e) => (
                      <CartCard
                        setState={setState}
                        setTotal={setTotal}
                        sumTotal={sumTotal}
                        key={e.id}
                        image={e.image}
                        isAvailable={e.isAvailable}
                        name={e.name}
                        price={e.price}
                        type={e.type}
                        quantitySelectedCartSh={e.quantitySelectedCartSh}
                      />
                    ))}
                  </div>
                  {/* footer carrito */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <div className="flex items-center">
                      <i className="fa fa-arrow-left text-sm pr-2"></i>
                      <Link
                        to="/productos"
                        className="text-md  font-medium text-blue-500"
                      >
                        Continuar comprando
                      </Link>
                    </div>

                    <div className="flex justify-center items-center">
                      <span className="text-sm font-medium text-gray-400 mr-1">
                        Subtotal:
                      </span>
                      <span className="text-lg font-bold text-gray-800 ">
                        ${total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* credit card */}
                <div className=" p-5 bg-gray-800 rounded overflow-visible">
                  <span className="text-xl font-medium text-gray-100 block pb-3">
                    Informacion de tarjeta
                  </span>
                  <span className="text-xs text-gray-400 ">Tipo de tarjeta</span>
                  <div className="overflow-visible flex justify-between items-center mt-2">
                    <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
                      <span className="italic text-lg font-medium text-gray-200 underline">
                        VISA
                      </span>
                      <div className="flex justify-between items-center pt-4 ">
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          ****
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs  text-gray-200">
                          {nameCard}
                        </span>
                        <span className="text-xs  text-gray-200">##/##</span>
                      </div>
                    </div>
                    <div className="flex justify-center  items-center flex-col">
                      <img
                        src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
                        width="40"
                        className="relative right-5"
                      />
                      <img
                        src="https://1000marcas.net/wp-content/uploads/2019/12/Visa-Logo-2005.jpg"
                        width="40"
                        className="relative right-5"
                      />
                    </div>
                  </div>
                  <form onSubmit={handlerSummit}>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Nombre del titular
                      </label>
                      <input
                        type="text"
                        value={nameCard}
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        placeholder="Juan Perez"
                        onChange={(e) => setNameCard(e.target.value)}
                      />
                      {nameCard ? (
                        <p className="text-red-700">{errorMsgName}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Numero de tarjeta
                      </label>
                      <CardNumberElement />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
                      <div className="col-span-2 ">
                        <label className="text-xs text-gray-400">
                          Fecha de vencimiento
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <CardExpiryElement />
                        </div>
                      </div>
                      <div className="">
                        <label className="text-xs text-gray-400">CVV</label>
                        <CardCvcElement />
                      </div>
                    </div>
                    <button
                      className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                      type="summit"
                    >
                      Comprar{loadingsti ? loadingPayment() : null}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
