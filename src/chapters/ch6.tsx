import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const createArray = (length: number) => [...Array(length)];

/* 
 * The most important thing to remember about Hooks is that they can
 * cause the component they’re hooked into to rerender. Every time we
 * invoke the setSelectedStars function to change the value of
 * selectedStars, the StarRating function component will be
 * reinvoked by the hook, and it will render again, this time with a new
 * value for selectedStars. This is why Hooks are such a killer feature.
 * When data within the hook changes, they have the power to rerender
 * the component they’re hooked into with new data.
* */

export function Ch6() {
	return (
		<>
		<h1>Chapter 6. React State Management</h1>
		<StarRating style={{marginTop: '30px', marginBottom: '20px'}} totalStars={5} />
		<Questionary />
		<Exercises />
		</>
	)
}

export function StarRating({ totalStars = 5, style = {} }: {totalStars: number, style: Object}) {
	const [selectedStars, setSelectedStars] = useState<number>(3);
	return (
		<div style={{ padding: 5, ...style}}>
			{createArray(totalStars).map((_, i) => (
				<Star key={i} selected={selectedStars > i} onSelect={() => {
					setSelectedStars(i + 1)	
				}} />)
			)}
			<p> {selectedStars} of {totalStars} </p>
		</div>
	)
}

const Star = ({ selected = false, onSelect = () => {} }: {selected: boolean, onSelect?: () => void}) => (
	<FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} />
);





function Hr() {
	return <><hr /><div style={{padding: '10px'}} /></>
}

/***** Cuestionario *****/

function Questionary() {
	return (
	<div style={{textAlign: 'left', padding: '40px'}}>
	<h2>Cuestionario</h2>
	<Hr />

	<p><strong>1. Para que sirve el hook useState, y como se utiliza en typescript</strong></p>
	<p>Respuesta: ... </p>
	<Hr />

	<p><strong>2. Que le sucede a los componentes que usan variables creadas con useState cuando se llama a la funcion que modifica esta ultima</strong></p>
	<p>Respuesta: ... </p>
	<Hr />

	<p><strong>3. Que es un componente 'puro' y que ventaja tiene utilizarlos</strong></p>
	<p>Respuesta: ... </p>
	<Hr />

	<p><strong>4. Que hace la function createContext y como se usa, que es un Provider y un Consumer</strong></p>
	<p>Respuesta: ... </p>
	<Hr />
	</div>
	)
}

/***** Ejercicios *****/

function Exercises() {
	return (
	<div style={{textAlign: 'left', padding: '40px'}}>
	<h2>Ejercicios</h2>
	<Hr />

	<p><strong>1. crea el juego tic tac toe</strong></p>
	<Hr />

	<p><strong>2. En este ejercicio, vas a crear un custom hook llamado useCountdown que se encargará de gestionar un contador regresivo. Luego, utilizarás este hook en un componente para mostrar el tiempo restante en la pantalla. ejemplo de uso: const[timeLeft, resetCountdown] = useCountdown;</strong></p>
	<Hr />

	<p><strong>3. haz que el componente del punto 2 sea puro, pasa el estado necesario para que funcione desde su componente padre</strong></p>
	<Hr />

	<p><strong>4. haz que el componente del punto 2 reciba su estado usando un context provider</strong></p>
	<Hr />
	</div>
	)
}
