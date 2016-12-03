import React,{Component} from 'react'
import Slider from './Slider'
import "../../public/css/slider.css"


export default class App extends Component{
    bindchange(event){
        debugger;
        console.log("当前值:"+event.target.value)
    }
    render(){
        return(
            <div className="app">
                <section className="slider">
                    <div className="basic-slider">
                        <h2>基础的range-slider</h2>
                        <Slider show-value onChange={this.bindchange.bind(this)}/>
                    </div>
                </section>
                <section className="slider">
                    <div className="basic-slider">
                        <h2>最大值200，最小值40,step为10，当前值50</h2>
                        <Slider min="40" max="200" step="10" value="50" show-value />
                    </div>
                </section>
                <section className="slider">
                        <div className="basic-slider">
                            <h2>禁用的</h2>
                            <Slider disabled show-value value="30"/>
                        </div>
                </section>
                <section className="slider">
                    <div className="basic-slider">
                        <h2>不显示值,最小值50,最大值400，当前值60</h2>
                        <Slider min="50" max="400" value="60" />
                    </div>
                </section>
            </div>
        )
    }
}
