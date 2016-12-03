import React, {
    Component, PropTypes
}
from 'react'

//事件监听的插件库
import addEventListener from 'rc-util/lib/Dom/addEventListener';


export default class Slider extends Component {
    constructor(...args) {
            super(...args);
            this.state = {
                value: this.props.value || 0
            }
        }
    pauseEvent(e){
        e.stopPropagation();
        e.preventDefault();
    }
        //兼容PC端和移动端
    addDocumentEvents(type) {
            if (type === 'touch') {
                // just work for chrome iOS Safari and Android Browser
                this.onTouchMoveListener =
                    addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
                this.onTouchUpListener =
                    addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
            } else if (type === 'mouse') {
                this.onMouseMoveListener =
                    addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
                this.onMouseUpListener =
                    addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
            }
        }
        //移除事件监听
    removeEvents(type) {
            if (type === 'touch') {
                this.onTouchMoveListener.remove();
                this.onTouchUpListener.remove();
            } else if (type === 'mouse') {
                this.onMouseMoveListener.remove();
                this.onMouseUpListener.remove();
            }
        }
    isNotTouchEvent(e){
        return e.touches.length>1||(e.type.toLowerCase()==="touchend"&&e.touches.length>0);
    }
    touchStart(e) {
        let position=e.touches[0].pageX;
        const handlePosition = this.getHandleCenterPosition(e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
        this.onStart(position);
        this.addDocumentEvents('touch');
        this.pauseEvent(e);
    }
    onTouchMove(e){
        const position=e.touches[0].pageX;
        this.onMove(e,position-this.dragOffset);
    }
    mouseDown(e) {debugger;
        if (e.button !== 0) {
            return
        };
        let position = e.pageX;
        const handlePosition = this.getHandleCenterPosition(e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
        this.onStart(position);
        this.addDocumentEvents('mouse');
        this.pauseEvent(e);
    }
    onMouseMove(e) {
        const position = e.pageX;
        this.onMove(e, position - this.dragOffset);
    }
    onMove(e, position) {
        this.pauseEvent(e);
        const {
            min, max
        } = this.props;
        const state = this.state;

        let diffPosition = position - this.startPosition;
        const diffValue = diffPosition / this.getSliderLength() * (max - min);
        const value = this.verifyValue(this.startValue + diffValue);
        if (value === this.state.value) return;
        this.setState({
            value: value
        });
        if(this.props.onChange){
            e.target.value=value;
            return this.props.onChange(e)
        }

    }
    end(type) {
        this.removeEvents(type);
    }
        //获取当前元素矩形对象的距离
    getHandleCenterPosition(target) {
        const coords = target.getBoundingClientRect(); //获取元素的矩形对象
        return coords.left + (coords.width * 0.5); //计算元素左边距离页面左边的距离和
    }
    
    onStart(position) {
            const {max,min}=this.props;
            let value = this.verifyValue(this.calcValueByPos(position));
            this.startValue = value;
            this.startPosition = position;
        }
    //验证值的有效范围
    verifyValue(val){
        const {min,max,step}=this.props;
        let value=val;
        val>=+(max)&&+(val=max);
        val<=+(min)&&+(val=min);
        const closestStep = (Math.round((val - min) / step) * step) + +(min);
        return closestStep
    }
    //验证step
    /*getPrecision(step){
        const stepStr=step.toString();
        let precision=0;
        if(stepStr.indexOf(".")>=0){
            precision=stepStr.length-stepStr.index(".")-1;
        }
        return precision 
    }*/
        //获取当前slider的长度
    getSliderLength() {
            if (!this._slider) {
                return 0;
            }
            return this._slider.clientWidth;
        }
        //获取初始的slider位置
    getSliderStart() {
            const rect = this._slider.getBoundingClientRect();
            return rect.left;
        }
        //根据position计算value
    calcValueByPos(position) {
            const {
                max, min, step
            } = this.props
            const pixelOffset = position - this.getSliderStart();
            const nextValue = this.calcValue(pixelOffset);
            return ((nextValue - min) / step) * step + +(min);
        }
        //计算当前的value
    calcValue(offset) {
            const {
                min, max
            } = this.props;
            const ratio = Math.abs(offset / this.getSliderLength());
            const value = ratio * (max - min) + +(min);
            return value;
        }
        //计算偏移的值
    calcOffset(value) {
        const {
            min, max
        } = this.props;
        const ratio = (value - min) / (max - min);
        return ratio * 100;
    }
    toBoolean(value){
        if(value===undefined||value===""||value==="null"||value==="undefined"){
            return false;
        }else if(typeof value==="boolean"){
            return value
        }
        return true
    }
    noop(){
        
    }
    render() {
        const {value} = this.state;
        const {disabled}=this.props;
        const trackStyle = {width: `${this.calcOffset(value)}%`};
        const handleStyle = {left: `${this.calcOffset(value)}%`};
        const markStyle=this.toBoolean(this.props["show-value"])?{display:"block"}:{display:"none"};
        return ( 
            < div className = "xc-slider"
                ref = {
                ref => this._slider = ref
                } 
                onTouchStart = {
                    this.toBoolean(disabled)?this.noop:this.touchStart.bind(this)
                }
                onMouseDown = {
                    this.toBoolean(disabled)?this.noop:this.mouseDown.bind(this)} >
                <div className="xc-slider-content" >
                < div className = "xc-slider-rail" > < /div> 
                < div className = "xc-slider-track" style = {trackStyle} > < /div> 
                < div className = "xc-slider-step" > < /div > 
                < div className = "xc-slider-handle" style = {handleStyle}  > < /div> 
                </div>
                < div className = "xc-slider-mark" style={markStyle} > {this.state.value} < /div> 
            < /div >
    )
}
/* Slider.propTypes={
        min:React.PropTypes.number,
        max:React.PropTypes.number,
        step:React.PropTypes.number,
        value:React.PropTypes.number,
        disable:React.PropTypes.bool,
        showValue:React.PropTypes.bool,
        bindchange:React.PropTypes.func
    }*/

}

Slider.defaultProps = {
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    "show-value":false
}
