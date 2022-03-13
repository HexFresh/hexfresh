import React from "react";
import { TransitionGroup } from "react-transition-group";
import "./Carousel.scss";
import { IRootStore } from "../../../store/store";
import { IPhase } from "../../../interface/program-interface";
import { connect } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { programStore } from "../../../store/planet/program-store";
interface ICarouselProps {
  programs?: typeof programStore.program;
}
interface ICarouselStates {
  items: IPhase[];
  active: number;
  direction: string;
}
class Carousel extends React.Component<ICarouselProps, ICarouselStates> {
  constructor(props: ICarouselProps) {
    super(props);
    this.state = {
      items: this.props.programs,
      active: 0,
      direction: "",
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }
  private rightClick() { };
  private leftClick() { };

  generateItems() {
    const items = [];
    let level;
    console.log(this.state.active);
    for (let i = this.state.active - 2; i < this.state.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }
      level = this.state.active - i;
      items.push(
        <Item key={index} /* id={this.state.items[index]} */ level={level} program={this.state.items[index]} />
      );
    }
    return items;
  }

  moveLeft() {
    let newActive = this.state.active;
    newActive--;
    this.setState({
      active: newActive < 0 ? this.state.items.length - 1 : newActive,
      direction: "left",
    });
  }

  moveRight() {
    let newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.state.items.length,
      direction: "right",
    });
  }

  componentDidMount(): void {

  }

  render() {
    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={this.leftClick}>
          {/* <FontAwesomeIcon icon={'arrow-alt-circle-left'} size='xs' /> */}
        </div>
        <TransitionGroup transitionName={this.state.direction}>
          {this.generateItems()}
        </TransitionGroup>
        <div className="arrow arrow-right" onClick={this.rightClick}>
          {/* <FontAwesomeIcon icon={'arrow-alt-circle-right'} size='xs'/> */}
        </div>

      </div>
    );
  }
}

interface IItemProps {
  level: number;
  program: IPhase;
  navigate: NavigateFunction;
}

interface IItemStates {
  level: number;
}

const Item = (props: any) => {
  const navigate = useNavigate();

  return <ItemClass {...props} navigate={navigate} />
}

class ItemClass extends React.Component<IItemProps, IItemStates> {
  constructor(props: IItemProps | Readonly<IItemProps>) {
    super(props);
    this.state = {
      level: this.props.level,
    };
  }

  render() {
    const className = "item level" + this.props.level;
    const backgroundSize = this.props.level === 0 ? '400px' : 'auto';
    const { program, navigate } = this.props;
    return (
      <>
        <div
          className={className}
          style={{
            backgroundImage: `url(${program.imageSrc})`,
            backgroundSize: backgroundSize/* "cover" */,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <span className="itemname">{program.name}</span>
          <button onClick={() => { navigate(`/planets/${program.id}`) }} className="btn btn-5">Press to do</button>
        </div>

      </>
    );
  }
}

const mapStateToProps = (state: IRootStore) => ({
  programs: state.programStore.programs,
})

export default connect(mapStateToProps, null)(Carousel);
