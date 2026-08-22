import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Loading...",
        location: "Loading...",
        avatar_url: "",
        bio: "",
        public_repos: 0,
        followers: 0,
        following: 0,
        company: "",
        blog: "",
        twitter_username: "",
        created_at: "",
      },
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/riyazr2");

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();

      this.setState({
        userInfo: json,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
        userInfo: {
          name: "Riyaz Pathan",
          location: "Solapur, Maharashtra",
          avatar_url: "/api/placeholder/200/200",
          bio: "Frontend Developer passionate about creating amazing user experiences with React and modern web technologies.",
          public_repos: 25,
          followers: 50,
          following: 30,
          company: "Freelance Developer",
          blog: "",
          twitter_username: "",
          created_at: "2020-01-01T00:00:00Z",
        },
      });
    }
  }

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  render() {
    const { userInfo, isLoading, error } = this.state;
    const {
      name,
      location,
      avatar_url,
      bio,
      public_repos,
      followers,
      following,
      company,
      twitter_username,
      created_at,
      html_url,
    } = userInfo;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading developer info...</span>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Gradient Background */}
          <div className="relative bg-gradient-to-r from-green-600 to-blue-600 px-8 py-12">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                  src={avatar_url || "/api/placeholder/200/200"}
                  alt={`${name}'s Avatar`}
                  onError={(e) => {
                    e.target.src = "/api/placeholder/200/200";
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                  <span className="text-lg">👨‍💻</span>
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
                <p className="text-xl text-green-100 mb-3">
                  Frontend Developer
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  {location && (
                    <div className="flex items-center space-x-1">
                      <span>📍</span>
                      <span>{location}</span>
                    </div>
                  )}
                  {company && (
                    <div className="flex items-center space-x-1">
                      <span>🏢</span>
                      <span>{company}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>Since {this.formatDate(created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Bio */}
            {bio && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed">{bio}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {public_repos}
                </div>
                <div className="text-sm text-gray-600">Repositories</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {followers}
                </div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {following}
                </div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Skills & Technologies
              </h3>

              {/* Frontend Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <span className="text-blue-500 mr-2">🎨</span>
                  Frontend Development
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "React.js", color: "from-blue-400 to-blue-600" },
                    {
                      name: "JavaScript (ES6+)",
                      color: "from-yellow-400 to-yellow-600",
                    },
                    { name: "TypeScript", color: "from-blue-500 to-blue-700" },
                    { name: "Next.js", color: "from-gray-700 to-gray-900" },
                    { name: "Redux", color: "from-purple-500 to-purple-700" },
                    { name: "Zustand", color: "from-orange-400 to-orange-600" },
                    {
                      name: "Tailwind CSS",
                      color: "from-cyan-400 to-cyan-600",
                    },
                    {
                      name: "Radix UI/Themes",
                      color: "from-indigo-400 to-indigo-600",
                    },
                    { name: "HTML5", color: "from-red-500 to-red-700" },
                    { name: "CSS3", color: "from-blue-500 to-blue-700" },
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 bg-gradient-to-r ${skill.color} text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-200 shadow-sm`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend & APIs */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <span className="text-green-500 mr-2">⚙️</span>
                  Backend & APIs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      name: "RESTful API",
                      color: "from-green-500 to-green-700",
                    },
                    {
                      name: "Prisma ORM",
                      color: "from-indigo-500 to-indigo-700",
                    },
                    {
                      name: "NextAuth.js",
                      color: "from-purple-500 to-purple-700",
                    },
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 bg-gradient-to-r ${skill.color} text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-200 shadow-sm`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-6">
                  Authentication & Authorization
                </p>
              </div>

              {/* Testing & Validation */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <span className="text-red-500 mr-2">🧪</span>
                  Testing & Validation
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Jest", color: "from-red-500 to-red-700" },
                    {
                      name: "React Testing Library",
                      color: "from-red-400 to-red-600",
                    },
                    { name: "Formik", color: "from-blue-500 to-blue-700" },
                    { name: "Yup", color: "from-orange-500 to-orange-700" },
                    { name: "Zod", color: "from-blue-600 to-blue-800" },
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 bg-gradient-to-r ${skill.color} text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-200 shadow-sm`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Version Control */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <span className="text-gray-600 mr-2">🛠️</span>
                  Tools & Version Control
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Git", color: "from-orange-500 to-orange-700" },
                    { name: "GitHub", color: "from-gray-700 to-gray-900" },
                    { name: "Jira", color: "from-blue-600 to-blue-800" },
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 bg-gradient-to-r ${skill.color} text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-200 shadow-sm`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expertise Summary */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-center mb-2">
                  <span className="text-green-600 mr-2">🚀</span>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Specialization
                  </h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Frontend React developer with expertise in modern JavaScript
                  frameworks, state management, UI/UX design, and comprehensive
                  testing strategies. Experienced in building responsive,
                  user-friendly web applications with clean, maintainable code.
                </p>
              </div>
            </div>

            {/* Contact & Links */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Get In Touch
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600">✉️</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <a
                        href="mailto:riyazpathan193.rp@gmail.com"
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        riyazpathan193.rp@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">📱</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Available for</div>
                      <div className="font-medium text-gray-800">
                        Freelance Projects
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  {html_url && (
                    <a
                      href={html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white">🐙</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 group-hover:text-gray-900">
                          GitHub Profile
                        </div>
                        <div className="text-sm text-gray-500">
                          View my repositories
                        </div>
                      </div>
                    </a>
                  )}

                  {twitter_username && (
                    <a
                      href={`https://twitter.com/${twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
                    >
                      <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white">🐦</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 group-hover:text-gray-900">
                          Twitter
                        </div>
                        <div className="text-sm text-gray-500">
                          @{twitter_username}
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white text-center">
              <h4 className="text-lg font-semibold mb-2">
                Let's Build Something Amazing Together!
              </h4>
              <p className="text-green-100 mb-4">
                Interested in collaborating or have a project in mind? I'd love
                to hear from you.
              </p>
              <a
                href="mailto:riyazpathan193.rp@gmail.com"
                className="inline-block px-6 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                📧 Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-600">
              <span>⚠️</span>
              <span className="font-medium">Note:</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              Using fallback data due to API limitations. Some information might
              not be current.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default UserClass;
