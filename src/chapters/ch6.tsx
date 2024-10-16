import React, { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useContext, createContext } from 'react';

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
	<p>Respuesta: useState se usa para crear un hook ligado a una variable, el tipo de la variable y valor inicial de la variable se especifica con la sintaxis useState&lt;type&gt;(initial_value). esta funcion retorna [variable, setVariable], la primera es una referencia a la variable del hook en cuestion, la segunda es una funcion que sirve para actualizar el valir de la variable, ademas de hacer que todos los componentes con algun tipo de dependencia a esta variable, sean actualizados con el nuevo valor (las funciones de cada uno de estos componentes vuelven a correr)</p>
	<Hr />

	<p><strong>2. Que le sucede a los componentes que usan variables creadas con useState cuando se llama a la funcion que modifica esta ultima</strong></p>
	<p>Respuesta: se actualizan (lean la respuesta de la 1 xd) </p>
	<Hr />

	<p><strong>3. Que es un componente 'puro' y que ventaja tiene utilizarlos</strong></p>
	<p>Respuesta: Un componente puro es aquel que no genera su propio estado, sino que lo recibe de su padre</p>
	<Hr />

	<p><strong>4. Que hace la function createContext y como se usa, que es un Provider y un Consumer</strong></p>
	<p>Respuesta: Create context crea un objeto que da acceso a un contexto que sirve para conectar estados entre padres e hijos sin necesidad de pasarlo dentro de los props de cada componente. Para esto, se wrappea el componente padre en un componente llamado object.Provider y en el prop value se le pasa un objeto con los objetos que contienen el estado. Para usar el consumer en uno de sus hijos, se debe importar el contexto creado con createContext, y la funcion useContext, a esta ultima se le pasa createContext como argumento y como respuesta recibimos el objeto que especificamos como value en el privider, donde habremos pasado nuestros estados</p>
	<Hr />
	</div>
	)
}

/***** Ejercicios *****/

function Exercises() {
	const [timeLeft, resetCountdown] = useCountdown(30)

	return (
	<div style={{textAlign: 'left', padding: '40px'}}>
	<h2>Ejercicios</h2>
	<Hr />

	<p><strong>1. crea el juego tic tac toe</strong></p>
	<TicTacToe />
	<Hr />

	<p><strong>2. En este ejercicio, vas a crear un custom hook llamado useCountdown que se encargará de gestionar un contador regresivo. Luego, utilizarás este hook en un componente para mostrar el tiempo restante en la pantalla. ejemplo de uso: const[timeLeft, resetCountdown] = useCountdown;</strong></p>

	<CountDown />
	<Hr />

	<p><strong>3. haz que el componente del punto 2 sea puro, pasa el estado necesario para que funcione desde su componente padre</strong></p>

	<CountDownPure timeLeft={timeLeft} resetCountdown={resetCountdown} />
	<Hr />


	<p><strong>4. haz que el componente del punto 2 reciba su estado usando un context provider</strong></p>

	<CountDownContext.Provider value={{ timeLeft, resetCountdown }}>
		<CountDownWithContext />	
	</CountDownContext.Provider>

	<Hr />
	</div>
	)
}

const CountDownContext = createContext({timeLeft: 0, resetCountdown: () => {}})

function useCountdown(value: number) {
	const [timeLeft, setTimeLeft] = useState<number>(value)

	const resetCountdown = () => {
		setTimeLeft(value)
	}

	useEffect(() => {
		const intId = setInterval(() => {
			if (timeLeft > 0) {
				setTimeLeft((prev) => ((prev > 0) ? prev-1 : 0))
			}
		}, 1000)

		return () => {
			clearInterval(intId)
		}
	}, [])

	return [timeLeft, resetCountdown] as const;
}

function CountDown() {
	const [timeLeft, resetCountdown] = useCountdown(30)

	return (
		<>
		<p onClick={() => {resetCountdown()}}>{timeLeft}</p>
		</>
	)
}

function CountDownPure({timeLeft, resetCountdown}:{timeLeft: number, resetCountdown: () => void}) {
	return (
		<>
		<p onClick={() => {resetCountdown()}}>{timeLeft}</p>
		</>
	)
}

function CountDownWithContext() {
	const {timeLeft, resetCountdown} = useContext(CountDownContext)

	return (
		<>
		<p onClick={() => {resetCountdown()}}>{timeLeft}</p>
		</>
	)
}

type ticTacCell = ' ' | 'o' | 'x' 

type ticTacState = {
	board: ticTacCell[][]
	next: 'o' | 'x'
}

function TicTacToe() {
	const [gameState, updateGameState] = useState<ticTacState>(
		{
			board:
				[[' ', ' ', ' '],
				[' ', ' ', ' '],
				[' ', ' ', ' ']],
			next: 'x'
		}
	)

	const onCellClick = (cellidx: number, rowidx: number) => {
		const newBoard = gameState.board.map( (row, ridx) => (
			row.map((cell, cidx) => (
				ridx === rowidx && cidx === cellidx ? gameState.next : cell
			))
		))

		updateGameState( {
			board: newBoard,
			next: (gameState.next === 'x') ? 'o' : 'x'
		} )
	}

	return (<TicTacBoard gs={gameState.board} onCellClick={onCellClick} />)

}

function TicTacBoard({gs, onCellClick}: {gs: ticTacCell[][], onCellClick: (cellidx: number, rowidx: number) => void}) {
	return (
		<div>
			{gs.map( (row, rowidx) => {
				return (
					<div key={rowidx} style={{display: 'flex'}}>
						{row.map( (cell, cellidx) => {
							return <TicTacCell val={cell} key={cellidx} onClick={() => {onCellClick(cellidx, rowidx)}} />
						})}
					</div>)
			})}	
		</div>
	)
}

function TicTacCell({val, onClick}: {val: ticTacCell, onClick: () => void}) {
	return (<div style={{border: '1px solid', height: '40px', width: '40px'}} onClick={onClick}>{val}</div>)
}
