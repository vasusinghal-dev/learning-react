import React from "react";
import ClassUser from "./ClassUser.js";
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
      <div className="m-12 flex flex-col items-center justify-center">
        <h1 className="mb-8 text-[2rem] text-[#333]">About Me</h1>

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
