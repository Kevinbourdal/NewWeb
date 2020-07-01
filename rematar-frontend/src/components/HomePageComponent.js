import React, {Component} from 'react';
import {Row, Carousel, CarouselItem, Card, CarouselIndicators, CarouselControl, CardImgOverlay} from 'reactstrap';
import CardGallery from "./CardGalleryComponent";
import {MDBContainer, MDBBtn, MDBFormInline,} from "mdbreact";
import { itemslist } from '../data/items_terrenos';
import Container from "reactstrap/es/Container";
import config from "../config";


const items = itemslist[0]['items'];

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auctions: {},
            query: '',
            animating: false,
            activeIndex: 0,
            non_results: false
        }
        this.category = window.location.pathname.replace('/home', '').replace('/', '')

        this.submitHandler = this.submitHandler.bind(this);
        this.handlechange = this.handlechange.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
    }

    submitHandler (e) {
        // recibimos los datos del backend
        if (this.state.query.length === 0)
            return
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/search?query='+this.state.query,
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({
                    auctions: res['data']['auctions'],
                    query: ''
                });
                this.next ()
            if (res['data']['auctions']['started'].length === 0 && res['data']['auctions']['future'].length === 0)
                this.setState({non_results: true});
            else
                this.setState({non_results: false});
            }
        ).catch(e => {
                console.log('error al obtener filtros');
            }
        )
    };

    handlechange (e) {
        this.setState({query: e.target.value})
    };

    next () {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 :this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous () {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex (newIndex) {
        if (this.state.animating) return;
        this.setState({activeIndex: newIndex});
    }


    render() {
        const slides = items.map((item) => {
            return (
                <CarouselItem
                    className="custom-tag"
                    tag="div"
                    key={item.key}
                    onExiting={() => this.setState({animating: true})}
                    onExited={() => this.setState({animating: false})}
                >
                    <img src={item.src} className="w-header" style={{height: "100%", width: "100%"}} alt={"fondo"}/>
                </CarouselItem>
            );
        });
        return (

            <div>
                <div className="p-0 m-0" style={{ height: '500px'}}>
                    <div className="container-fluid no-padding h-25 p-0 m-0 ">

                        <div  style={{ height: '80vh' }} className="">
                            <style>
                                {`.custom-tag {
                              max-width: 100%;
                              height: 500px;
                              background: black;
                        }`}
                            </style>
                            <Card style={{ width: "100%"}}>
                                <Carousel
                                    slide={false}
                                    activeIndex={this.state.activeIndex}
                                    next={this.next}
                                    previous={this.previous}
                                >
                                    <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                </Carousel>

                                <CardImgOverlay className="text-white justify-content-center text-center align-text-bottom h-75 mt-5">
                                    <Container className="mt-4">
                                        <Row className="d-sm-block">
                                            <h1 className="w-100 text-dark">Encontrá las mejores inversiones</h1>
                                        </Row>
                                        <MDBContainer  className=" my-5">
                                            <MDBFormInline className="md-form mt-5 ml-5">
                                                <input
                                                    className="form-control mt-5 mr-sm-1 text-white"
                                                    style={{width:"80%"}}
                                                    type={"search"}
                                                    name={"search"}
                                                    placeholder="Buscar"
                                                    aria-label="Search"
                                                    value={this.state.query}
                                                    onChange={this.handlechange}
                                                    onSubmit={this.submitHandler}
                                                    autoComplete={'off'}
                                                />
                                                <MDBBtn onClick={this.submitHandler}
                                                        className="info-color-dark mt-5 " style={{color: "#424242", fontSize: "15px"}}
                                                        rounded size="sm"
                                                        // type='submit'
                                                >
                                                    <b>Buscar</b>
                                                </MDBBtn>
                                            </MDBFormInline>
                                        </MDBContainer>

                                    </Container>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </div>
                </div>
                {/*<div id="filterbar">*/}
                {/*   <MDBCol className="">*/}
                {/*      <MDBRow className="justify-content-center">*/}
                {/*         /!*<NavFiltro/>*!/*/}
                {/*      </MDBRow>*/}
                {/*   </MDBCol>*/}
                {/*</div>*/}
                {this.state.non_results ?
                    <div className='my-5 text-center'>
                        <h3>Sin Resultados</h3>
                    </div>
                    :
                    <div>
                        <h1 className="text-center mt-3 w-100" hidden={this.category===''}>{ this.category }s</h1>
                        <CardGallery auctions={this.state.auctions}/>
                    </div>
                }

            </div>

        )
    }
}

//
// const HomePage = (props) => {
//       let categories = 'home';
//       let items = itemslist[0]['items'];
//       const [activeIndex, setActiveIndex] = useState(0);
//       const [animating, setAnimating] = useState(false);
//
//
//     const [query, setQuery] = useState('');
//     const [auctions, setAuctions] = useState({});
//
//     //itemslist = props.itemslist;
//    //handleChange = handleChange.bind(this);
//    //Auth = new AuthService();  TODO:  ver AuthService
//
//     const handlechange = (e) =>{
//         setQuery(e.target.value)
//     };
//
//     const submitHandler = () => {
//         // recibimos los datos del backend
//         fetch(
//             config["api"]['BACKEND_ENDPOINT']+'/api/search?query='+query,
//             {
//                 mode: 'cors',
//                 method: 'GET',
//             }
//         ).then(data => {return data.json()}
//         ).then(res => {
//                 setAuctions(res['data']['auctions']);
//             console.log(res)
//                 alert('step')
//
//             }
//         ).catch(e => {
//                 console.log('error al obtener filtros');
//             }
//         )
//     };
//
//
//     const next = () => {
//       if (animating) return;
//       const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
//       setActiveIndex(nextIndex);
//    }
//
//    const previous = () => {
//       if (animating) return;
//       const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
//       setActiveIndex(nextIndex);
//    }
//
//    const goToIndex = (newIndex) => {
//       if (animating) return;
//       setActiveIndex(newIndex);
//    }
//
//
//    const slides = items.map((item) => {
//       return (
//          <CarouselItem
//             className="custom-tag"
//             tag="div"
//             key={item.key}
//             onExiting={() => setAnimating(true)}
//             onExited={() => setAnimating(false)}
//          >
//             <img src={item.src} className="w-header" style={{height: "100%", width: "100%"}} alt={"fondo"}/>
//          </CarouselItem>
//       );
//    });
//
//         return (
//
//          <div>
//             <div className="p-0 m-0" style={{ height: '400px'}}>
//                <div className="container-fluid no-padding h-25 p-0 m-0 ">
//
//                   <div  style={{ height: '70vh' }} className="">
//                      <style>
//                         {`.custom-tag {
//                               max-width: 100%;
//                               height: 400px;
//                               background: black;
//                         }`}
//                      </style>
//                      <Card style={{ width: "100%"}}>
//                         <Carousel
//                            slide={false}
//                            activeIndex={activeIndex}
//                            next={next}
//                            previous={previous}
//                         >
//                            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
//                            {slides}
//                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
//                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
//                         </Carousel>
//
//                         <CardImgOverlay className="text-white justify-content-center text-center align-text-bottom h-75 mt-5">
//                            <Container className="mt-4">
//                               <Row className="d-sm-block">
//                                  <h2 className="w-100">Encontra las mejores inversiones</h2>
//                               </Row>
//                                  <MDBContainer  className=" my-5">
//                                     <MDBFormInline className="md-form mt-5 ml-5">
//                                        <input
//                                           className="form-control mt-5 mr-sm-1 text-white"
//                                           style={{width:"80%"}}
//                                           type={"search"}
//                                           name={"search"}
//                                           placeholder="Buscar"
//                                           aria-label="Search"
//                                           onChange={handlechange}
//                                        />
//                                        <MDBBtn onClick={submitHandler}
//                                                className="info-color-dark mt-5 " style={{color: "#424242", fontSize: "15px"}}
//                                                rounded size="sm"
//                                        >
//                                           <b>Buscar</b>
//                                        </MDBBtn>
//                                     </MDBFormInline>
//                                  </MDBContainer>
//
//                            </Container>
//                         </CardImgOverlay>
//                      </Card>
//                   </div>
//                </div>
//             </div>
//             {/*<div id="filterbar">*/}
//             {/*   <MDBCol className="">*/}
//             {/*      <MDBRow className="justify-content-center">*/}
//             {/*         /!*<NavFiltro/>*!/*/}
//             {/*      </MDBRow>*/}
//             {/*   </MDBCol>*/}
//             {/*</div>*/}
//             <CardGallery categories={categories} auctions={auctions}/>
//          </div>
//         );
// }

export default HomePage;
