import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Initial_Dummy_Name",
        location: "Initial_Dummy",
        avatar_url: "#Dummy",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/riyazr2");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
    // console.log("userInfo: ", json);
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-center items-center mb-6">
            <img
              className="w-40 h-40 rounded-full border-4 border-gray-300"
              src={avatar_url}
              alt="User Avatar"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600 mb-4">{location}</p>
            <p className="text-gray-700">
              Contact:{" "}
              <a
                href="mailto:riyazpathan193.rp@gmail.com"
                className="text-blue-500"
              >
                riyazpathan193.rp@gmail.com
              </a>
            </p>
            <p className="text-gray-700">Solapur, Maharashtra</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserClass;
