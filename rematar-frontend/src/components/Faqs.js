import React, { useState } from "react";
import {
	Card,
	CardImg,
	CardBody,
	Collapse,
	Button,
	Col
} from 'reactstrap';
import Container from "reactstrap/es/Container";

const faq_list = [
	{
		'number': '+',
		'title' : 'Qué es periodo de subasta?.',
		'answer': 'Es el periodo de tiempo que estableces para colocar a tu bien en una subasta' +
			' e implica desde que se incorpora el bien a ' +
			'nuestros datos y comienza'
	},
	{
		'number': '+',
		'title' : 'Precio base o de inicio, seguro, precio de adjudicación, precio de mercado.',
		'answer': 'El precio BASE O DE INICIO es el precio de partida de la subasta. Nadie podrá pujar por debajo de él.' +
			' El SEGURO  marca el nivel al que te reservas el derecho de aceptar pujas o no, es decir, por debajo de ese precio no tienes la obligación de aceptar, ' +
			'pero lo puedes hacer, si así lo deseas.' +
			' El precio de ADJUDICACIÓN es el precio de la oferta ganadora en la subasta, y PRECIO DE MERCADO es el valor de referencia de los mercados locales.'
	},
	{
		'number': '+',
		'title' : 'Qué garantias ofrece SUBASTAS EN WEB en todo el proceso.',
		'answer': 'SUBASTAS EN WEB interviene y supervisa toda la operativa de la Subasta, la promoción de la misma, su procedimiento y culminación con la firma de los instrumentos públicos y/o privados correspondientes' +
					', con el debido asesoramiento legal y jurídico.'
	},
];

const Faqs = () => {
	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
  	const toggle1 = (e) =>{
			faq_list[e.target.id]['number'] = !isOpen1 ? '-' : '+'
			setIsOpen1(!isOpen1)
	};
  	const toggle2 = (e) =>{
		faq_list[e.target.id]['number'] = !isOpen2 ? '-': '+'
  		setIsOpen2(!isOpen2)
	};
  	const toggle3 = (e) => {
		faq_list[e.target.id]['number'] = !isOpen3 ? '-': '+'
  		setIsOpen3(!isOpen3)
	};
  	const toggle_list = [toggle1, toggle2, toggle3]
	const isOpen_list = [isOpen1, isOpen2, isOpen3]
	return (
	    <div>
		  {/*<Card>*/}
	      {/*   <CardImg  src="https://segurosypensionesparatodos.fundacionmapfre.org/syp/es/images/preguntas-892x350_tcm558-548340.png" alt="Card image cap" />*/}
			{/* <div class="card-img-overlay mt-5">*/}
			{/*	<h1 class="text-center mt-5">Preguntas Frecuentes</h1>*/}
			{/* </div>*/}
	      {/*</Card>*/}
			<h1 className="text-left ml-4 mt-5">Preguntas Frecuentes</h1>
	      <hr className="d-inline-block info-color-dark" style={{ width: "100%" }}/>
	      <div className=" justify-content-center text-center ">
			  <Col className="text-left" >
				{faq_list.map((faqs, idx) =>
					<div className="mt-4">
						<Button color='link' id={idx} style={{color: 'black', fontSize:'20px', textDecoration: 'none'}} onClick={toggle_list[idx]} >
							{faqs['number']} {faqs['title']}
						</Button>
						<Collapse isOpen={isOpen_list[idx]}>
							<Card>
								<CardBody>
									{faqs['answer']}
								</CardBody>
							</Card>
						</Collapse>
						<br/>
					</div>
				)}
			  </Col>
		  </div>
	    </div>
	);
}

export default Faqs;
