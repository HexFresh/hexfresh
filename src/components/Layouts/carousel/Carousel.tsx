import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransitionGroup } from "react-transition-group";
import "./Carousel.scss";
interface ICarouselProps {
  items: Array<any>;
  active: number
}
interface ICarouselStates{
  items: Array<any>;
  active: number;
  direction: string;
}
class Carousel extends React.Component<ICarouselProps,ICarouselStates> {
  constructor(props: ICarouselProps) {
    super(props);
    this.state = {
      items: this.props.items,
      active: this.props.active,
      direction: "",
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }
  private rightClick(){};
  private leftClick(){};

  generateItems() {
    var items = [];
    var level;
    console.log(this.state.active);
    for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
      var index = i;
      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }
      level = this.state.active - i;
      items.push(
        <Item key={index} /* id={this.state.items[index]} */ img={this.state.items[index].images} level={level} />
      );
    }
    return items;
  }

  moveLeft() {
    var newActive = this.state.active;
    newActive--;
    this.setState({
      active: newActive < 0 ? this.state.items.length - 1 : newActive,
      direction: "left",
    });
  }

  moveRight() {
    var newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.state.items.length,
      direction: "right",
    });
  }

  componentDidMount(): void {
      console.log(this.state.items);
  }

  render() {
    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={this.leftClick}>
          <FontAwesomeIcon icon={'arrow-alt-circle-left'} size='xs' />
        </div>
        <TransitionGroup transitionName={this.state.direction}>
          {this.generateItems()}
        </TransitionGroup>
        <div className="arrow arrow-right" onClick={this.rightClick}>
        <FontAwesomeIcon icon={'arrow-alt-circle-right'} size='xs'/>
        </div>
       
      </div>
    );
  }
}

interface IItemProps{
  level:number;
  img:string;
}

interface IItemStates{
  level:number,
}

class Item extends React.Component<IItemProps,IItemStates> {
  constructor(props: IItemProps | Readonly<IItemProps>) {
    super(props);
    this.state = {
      level: this.props.level,
    };
  }

  render() {
    const className = "item level" + this.props.level;
    const backgroundSize = this.props.level===0?'400px':'auto';
    return (
      <>
      <div
        className={className}
        style={{
          backgroundImage: `url(${this.props.img})`,
          backgroundSize: backgroundSize/* "cover" */,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        > 
        <span className="itemname">Onboarding</span>
        <button className="btn btn-5">Press to do</button>
        </div>
        
        </>
    );
  }
}

export default Carousel;
