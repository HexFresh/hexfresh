import React from "react";
import { TransitionGroup } from "react-transition-group";
import "./Carousel.scss";
import { IRootDispatch, IRootStore } from "../../../store/store";
import { IImage, IPhase } from "../../../interface/program-interface";
import { connect } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { programStore } from "../../../store/planet/program-store";
import { RematchDispatch, RematchDispatcher } from "@rematch/core";
import { message, notification, Progress, Spin, Typography } from "antd";
import _ from "lodash";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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
    const { isLoading, active } = this.state;
    if (isLoading || _.isEmpty(this.state.items)) return <></>;
    const items = [];
    let level;
    if (this.state.items.length < 5) {

      for (let i = 0; i < active + this.state.items.length; i++) {
        let index = i;
        if (i < 0) {
          index = this.state.items.length + i;
        } else if (i >= this.state.items.length) {
          index = i % this.state.items.length;
        }
        level = active - i;
        const image = _.find(imageList, { id: this.state.items[ index ]?.phase?.imageId })
        items.push(
          <Item key={index} level={level} program={this.state.items[ index ].phase} image={image} />
        );
      }
    } else {

      for (let i = active - 2; i < active + 3; i++) {
        let index = i;
        if (i < 0) {
          index = this.state.items.length + i;
        } else if (i >= this.state.items.length) {
          index = i % this.state.items.length;
        }
        level = this.state.active - i;
        const image = _.find(imageList, { id: this.state.items[ index ]?.phase?.imageId })
        items.push(
          <Item key={index} level={level} program={this.state.items[ index ].phase} image={image} />
        );
      }
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
    const { doFetchProgram, doFetchImageList, program, imageList } = this.props;

    try {
      this.setState({ isLoading: true });
      _.isEmpty(program) && doFetchProgram();

      _.isEmpty(imageList) && doFetchImageList();

    } catch (error) {
      notification.error({ message: 'Failed to fetch list of phases.' });
    }

    this.setState({ isLoading: false });
  }

  componentDidUpdate(prevProps: ICarouselProps, prevState: ICarouselStates) {
    const { isFetchingImageList, isFetchingPhase } = this.props;
    if (!_.isEqual(prevProps, this.props)) {
      this.setState({ items: this.props.program.userPhases, isLoading: isFetchingImageList || isFetchingPhase });
    }
  }

  render() {
    const { program, imageList } = this.props;
    const { isLoading } = this.state;

    if (_.isEmpty(program) || _.isEmpty(imageList) || isLoading) {
      return <div className="loading" >
        <img src="/gifrocket-rocket.gif" alt="loading rocket" />
        <Typography.Text className="text">Please wait a second...</Typography.Text>
      </div>
    }
    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={this.leftClick}>
          <LeftOutlined style={{ color: 'white' }} />
        </div>
        <TransitionGroup transitionName={this.state.direction}>
          {this.generateItems()}
        </TransitionGroup>
        <div className="arrow arrow-right" onClick={this.rightClick}>
          <RightOutlined style={{ color: 'white' }} />
        </div>

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
    const backgroundSize = this.props.level === 0 ? '400px' : 'auto';
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
          <button onClick={() => { navigate(`/planets/${program?.id}`) }} className="btn btn-5">Press to do</button>
        </div>

      </>
    );
  }
}
