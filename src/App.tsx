import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Ch6 } from './chapters/ch6';

const paginas = ["principal", "fotos", "videos", "contacto"]

const App = () => {
	return (
		<>
		<header>
			<h1>Learning React</h1>
		</header>
		<nav>
			<ul>
			{paginas.map((pagina, idx) => {
				return <li key={idx}>{pagina}</li>
			})}
			</ul>
		</nav>
		<section>
			<article id="ch6">
				<Ch6 />
			</article>
		</section>
		<aside>
			<blockquote>
				<a href="#ch6">Chapter 6</a>
			</blockquote>
		</aside>
		<footer>
			Derechos reservados &copy; 2010-2011
		</footer>
		</>
	);
};

function StarRating() {
	return <>
		<FaStar color="red" />
		<FaStar color="red" />
		<FaStar color="red" />
		<FaStar color="grey" />
		<FaStar color="grey" />
	</>
}

export default App;
