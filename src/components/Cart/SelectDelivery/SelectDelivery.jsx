import React, { useState } from 'react';
import SwitchSelector from 'react-switch-selector';
import Search from '../../Maps/search/Search';

function SelectDelivery({ setChooseLocation, setSelectedDelivery }) {
  const [delivery, setDelivery] = useState('takeAway');
  const options = [
    {
      label: (
        <span className="text-white p-2 text-sm">
          <i className="fa-solid fa-person-walking" /> Retirar en el local
        </span>
      ),
      value: 'takeAway',
      selectedBackgroundColor: '#0097e6',
    },
    {
      label: (
        <span className="text-white p-2 text-sm">
          <i className="fa-solid fa-motorcycle p-1" />
          Delivery
        </span>
      ),
      value: 'delivery',
      selectedBackgroundColor: '#0097e6',
    },
  ];

  const onChange = (newValue) => {
    setDelivery(newValue);
  };
  const handleOnClick = () => {
    setChooseLocation(false);
    setSelectedDelivery(delivery);
  };
  return (
    <>
      <h1 className="text-xl font-medium text-gray-100 block pb-3">
        Seleccione un método de entrega:
      </h1>
      <div className="w-full h-10 mb-4">
        <SwitchSelector
          onChange={onChange}
          options={options}
          backgroundColor={'#676f80'}
          selectedFontColor={'#f5f6fa'}
        />
      </div>
      {delivery === 'takeAway' ? (
        <div className="font-medium text-gray-100 h-2/3">
          <div>Retiralo en: 15 minutos</div>
          <div>Padilla 1500, CABA</div>
          <iframe
            title="local"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.3619211149653!2d-58.448086700000005!3d-34.5950086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5f638ba750b%3A0xcfcd36bdd828a987!2sPadilla%201500%2C%20C1414AGV%20CABA!5e0!3m2!1ses!2sar!4v1662135035883!5m2!1ses!2sar"
            width="200"
            height="150"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div className="font-medium text-gray-100 h-2/3 overflow-y-auto h-72 mb-5" >
          <label className="font-medium text-gray-100 ">
            Ingrese la dirección de entrega:
          </label>
          <Search/>
        </div>
      )}
      <button
        onClick={handleOnClick}
        className="text-xl font-medium block h-10 m-auto px-5 text-indigo-100 bg-gray-400 rounded-lg transition-colors duration-150 hover:bg-sky-700 transition duration-700;"
      >
        Confirmar selección
      </button>
    </>
  );
}

export default SelectDelivery;
