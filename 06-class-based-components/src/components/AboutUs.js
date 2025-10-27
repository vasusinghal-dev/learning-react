import React from "react";
import ClassUser from "./ClassUser";
import ShimmerCard from "./ShimmerCard.js";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  async componentDidMount() {
    const res = await fetch("https://api.github.com/users/vasusinghal-dev");
    const data = await res.json();

    this.setState({
      userInfo: { ...data, age: 23 },
    });
  }

  render() {
    const { userInfo } = this.state;

    return (
      <div className="about-container">
        <h1 className="about-title">About Me</h1>

        {userInfo ? (
          <ClassUser
            name={userInfo.name}
            age={userInfo.age}
            location={userInfo.location}
            avatar_url={userInfo.avatar_url}
          />
        ) : (
          <ShimmerCard />
        )}
      </div>
    );
  }
}

export default AboutUs;
