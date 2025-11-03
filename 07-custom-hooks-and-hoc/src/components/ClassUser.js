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
      <div className="shadow-[0 4px 10px rgba(0,0,0,0.1)] hover:shadow-[0 6px 14px rgba(0, 0, 0, 0.15)] mx-auto my-5 flex min-w-80 flex-col items-center rounded-2xl border border-solid border-[#ddd] bg-[#f8f9fa] p-5 transition-transform duration-200 ease-in-out hover:-translate-y-1 [&>p]:my-2 [&>p]:text-sm [&>p]:text-[#333] [&>strong]:text-[#007bff]">
        <img
          src={avatar_url}
          alt="my avatar"
          className="mb-4 h-32 w-32 rounded-full border-[3px] border-[#007bff] object-cover"
        />
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
