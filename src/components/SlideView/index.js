import React, { useState } from 'react'
import FirstView from './FirstView';
import SecView from './SecView'
import LastView from './LastView'
import dot from '../../assets/img/dot.svg'
import Target from './Target';

export default class SlideView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            index: 0,
        }
    }

    Target = () => {
        return (
            <div class="inrow px-8 w-1/12 mb-40 absolute">
                <ul class="">
                    <li class="">
                        <span
                            class="active:border-black block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                            <img src={dot} class="mt-1.5 ml-1.5" />
                        </span>
                    </li>
                    <li class="">
                        <span
                            class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                            <img src={dot} class="mt-1.5 ml-1.5 stroke-current stroke-1  text-white hover:text-black" />
                        </span>
                    </li>
                    <li class="">
                        <span
                            class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                            <img src={dot} class="mt-1.5 ml-1.5 stroke-current fill-current hover:text-black" />
                        </span>
                    </li>
                </ul>
            </div>
        )
    }

    handleTab(i) {
        // console.log(ind)
        this.setState({
            index: i
        })
    }

    renderMyComponents(myComponents) {
        console.log(myComponents)
        return myComponents.map((Component, index) =>
            <Component key={index} />
        );
    }

    
    render() {
        const { index } = this.state
        const i = localStorage.getItem('index')
        let components = [MyComponent1, MyComponent2, MyComponent3]
        return (
            this.props.index === 0 ?
                <MyComponent1 /> :
                this.props.index === 1 ?
                    <MyComponent2 /> : <MyComponent3 />
        )
    }
}

class MyComponent1 extends React.Component {
    render() {
        return (
            <div>
                <FirstView />
            </div>
        );
    }
}

class MyComponent2 extends React.Component {
    render() {
        return (
            <SecView />
        );
    }
}

class MyComponent3 extends React.Component {
    render() {
        return (
            <LastView />
        );
    }
}




// import React from 'react'
// import Slider from 'react-slick'
// import MainCar from './FirstView'
// // import NextThree from '../screens/nextThree'
// // import NextTwo from '../screens/nextTwo'
// import styled from 'styled-components'

// const Page = styled.div`
//     width: 100%;
// `
// export default class SlideView extends React.Component {
//     render() {
//         return (
//             <Slider
//                 speed={500}
//                 slidesToShow={1}
//                 slidesToScroll={1}
//                 infinite={false}
//             >

//                 <MainCar />
//                 <NextTwo />
//                 <NextThree />
//                 {/* <Page>1</Page>
//                 <Page>2</Page>
//                 <Page>3</Page> */}
//             </Slider>
//         )
//     }
// }
