import React, { useState } from "react";
import {
	Card,
	CardImg,
	CardBody,
	Collapse,
	Button,
	Col
} from 'reactstrap';

const faq = ""+
"Aca encontraria usted una buena respuesta a la primera pregunta,\n" +
"Aca encontraria usted una buena respuesta a la primera pregunta\n" +
"Aca encontraria usted una buena respuesta a la primera pregunta\n" +
"Aca encontraria usted una buena respuesta a la primera pregunta.\n" +
"o No";

const faq_list = [faq,faq,faq,faq];

const Faqs = () => {
	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
  	const toggle1 = () => setIsOpen1(!isOpen1);
  	const toggle2 = () => setIsOpen2(!isOpen2);
  	const toggle3 = () => setIsOpen3(!isOpen3);
  	const toggle_list = [toggle1, toggle2, toggle3]
	const isOpen_list = [isOpen1, isOpen2, isOpen3]
	return (
	    <div>
		  <Card>
	         <CardImg  src="https://www.bairescampus.com.ar/images/preguntas-frecuentes.png" alt="Card image cap" />
			 <div class="card-img-overlay mt-5">
				<h1 class="text-center mt-5">Preguntas Frecuentes</h1>
			 </div>
	      </Card>
	      <br/>
	      <div className="align-items-center-5 justify-content-center text-center">
			  <Col className="">
				{faq_list.map((faq, idx) =>
					<div className="mt-5">
						<Button className="btn btn-primary btn-lg btn-block" color="primary" onClick={toggle_list[idx]} style={{ marginBottom: '1rem' }}>
							{idx+1} - Por que deberia confiar en nosotros?
						</Button>
						<Collapse isOpen={isOpen_list[idx]}>
							<Card>
								<CardBody>
									{faq}
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
