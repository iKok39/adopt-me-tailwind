import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className=" mt-2 flex h-96 items-center justify-around">
        <img
          className=" max-w-48 max-h-96"
          src={images[active]}
          alt="animal hero"
        />
        <div className=" w-6/12">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={` m-4 inline-block h-24 w-24 cursor-pointer rounded-full border-2 border-black ${
                index === active ? " border-black opacity-60" : ""
              }`}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
