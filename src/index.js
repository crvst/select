import React from 'react';
import ReactDOM from 'react-dom';
import Select from './components/select';
import './assets/styles';

const venuesType = [
  {id: 'fast', value: 'Быстро перекусить'},
  {id: 'large', value: 'Большая компания'},
  {
    id: 'catering',
    value: 'Кейтеринг — отрасль общественного питания, связанная с оказанием услуг на удалённых точках, включающая все предприятия и службы'
  },
  {id: 'pizzaDelivery', value: 'Доставка пиццы в Минске', disabled: true},
  {id: 'wifi', value: 'Wi-Fi'}
];

const vacationDestination = [
  {id: 'korea', value: 'Корейская Народно-Демократическая Республика'},
  {id: 'yemen', value: 'Народная Демократическая Республика Йемен', disabled: true},
  {id: 'cz', value: 'Чехословацкая Социалистическая Республика', disabled: true},
  {id: 'zr', value: 'Республика Заир', disabled: true},
  {id: 'trcy', value: 'Турецкая Республика Северного Кипра'}
];

ReactDOM.render(
  <Select data={venuesType} name="venue"/>,
  document.getElementById('venue')
);


ReactDOM.render(
  <Select data={vacationDestination} name="venue"/>,
  document.getElementById('vacation')
);
