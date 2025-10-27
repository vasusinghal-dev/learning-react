import React from "react";

class ClassUser extends React.Component {
  // If you define your own constructor, you must call super(props)
  // Otherwise, React automatically calls the parent constructor for you behind the scenes
  /* constructor(props) {
    super(props);
  } */

  render() {
    const { name, age, location, avatar_url } = this.props;

    return (
      <div className="user-card">
        <img src={avatar_url} alt="my avatar" />
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Age:</strong> {age}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>
    );
  }
}

export default ClassUser;
