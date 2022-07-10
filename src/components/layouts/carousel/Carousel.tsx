import React from "react";
import { TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { notification } from "antd";
import _, { isEqual, reverse } from "lodash";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { IRootDispatch, IRootStore } from "../../../store/store";
import { IImage, IPhase } from "../../../interface/program-interface";
import { RocketLoading } from "../../loading/rocket-loading.component";
import { INT_ONE, INT_TWO, INT_ZERO } from "../../../constant";

import "./Carousel.scss";
import { EmptyResult } from "../../results";

type ICarouselProps = StateProps & DispatchProps;

interface ICarouselStates {
  items: IPhase[];
  active: number;
  direction: string;
  isLoading: boolean;
}

class Carousel extends React.Component<ICarouselProps, ICarouselStates> {
  constructor(props: ICarouselProps) {
    super(props);
    this.state = {
      items: this.props.program?.userPhases || [],
      active: 0,
      direction: "",
      isLoading: false,
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }
  private rightClick() { };
  private leftClick() { };

  generateItems() {
    const { imageList } = this.props;
    const { isLoading, active, items } = this.state;
    if (!isLoading && !_.isEmpty(items)) {

      const itemsPhase = [];
      let level;

      for (let i = 0; i < items?.length; i++) {
        let index = i;
        
        level = active - i;
        const image = _.find(imageList, { id: items[ index ]?.phase?.imageId })
        itemsPhase.push(
          <Item key={index} level={level} program={items[ index ].phase} image={image} />
        );
      }

      return itemsPhase;
    }

    return <></>;
  }

  moveLeft() {
    const { active } = this.state;
    let newActive = active;
    newActive--;

    this.setState({
      active: newActive < INT_ZERO ? active : newActive,
      direction: "left",
    });
  }

  moveRight() {
    const { active, items } = this.state;
    let newActive = active;
    newActive++;
    this.setState({
      active: newActive < items?.length ? newActive : items?.length - INT_ONE,
      direction: "right",
    });
  }

  componentDidMount(): void {
    const { doFetchProgram, doFetchImageList, program, imageList } = this.props;

    try {
     
      _.isEmpty(program) && doFetchProgram();

      _.isEmpty(imageList) && doFetchImageList();

    } catch (error) {
      notification.error({ message: 'Failed to fetch list of phases.' });
    }
  }

  componentDidUpdate(prevProps: ICarouselProps, prevState: ICarouselStates) {
    const { isFetchingImageList, isFetchingPhase } = this.props;
    if (!_.isEqual(prevProps, this.props)) {
      this.setState({ items: this.props.program.userPhases, isLoading: isFetchingImageList || isFetchingPhase });
    }
  }

  render() {
    const { program } = this.props;
    const { isLoading, items, active } = this.state;

    if (isLoading) {
      return <RocketLoading />
    }

    if ((_.isEmpty(program)|| _.isEmpty(program?.userPhases)) && !isLoading) {
      return <div className="carousel-result">
      <EmptyResult message="Your current program will displayed here." />
      </div>
    }
    return (
      <div id="carousel" className="noselect">
        {!isEqual(active, INT_ZERO) && <div className="arrow arrow-left" onClick={this.leftClick}>
          <LeftOutlined style={{ color: 'white' }} />
        </div>}
        {this.generateItems()}
        {(active < items?.length - INT_ONE) && <div className="arrow arrow-right" onClick={this.rightClick}>
          <RightOutlined style={{ color: 'white' }} />
        </div>}

      </div>
    );
  }
}

const mapStateToProps = (state: IRootStore) => ({
  program: state.programStore.program,
  imageList: state.programStore.imageList,
  isFetchingPhase: state.programStore.isFetchingPhase,
  isFetchingImageList: state.programStore.isFetchingImageList,
});

const mapDispatchToPprops = (dispatch: IRootDispatch) => ({
  doFetchProgram: dispatch.programStore.doFetchProgram,
  doFetchImageList: dispatch.programStore.doFetchImageList,
});
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToPprops>;

export default connect(mapStateToProps, mapDispatchToPprops)(Carousel);

interface IItemProps {
  level: number;
  program: IPhase;
  navigate: NavigateFunction;
  image: IImage;
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
    const backgroundSize = this.props.level === 0 ? '400px' : this.props.level === -INT_TWO ? '50% ' : 'auto';
    const { program, navigate, image } = this.props;

    return (
      <>
        <div
          className={className}
          style={{
            backgroundImage: `url(${image?.imageLink})`,
            backgroundSize: backgroundSize/* "cover" */,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <span className="itemname">{program?.title}</span>
          <span className="item_index" >{program?.index}</span>
          <button onClick={() => { navigate(`/planets/${program?.id}`) }} className="btn btn-5">Press to do</button>
        </div>

      </>
    );
  }
}
