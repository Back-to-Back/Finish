
const About = () => {
  return (
    <div className="pt-24 pl-72 pr-6 pb-12 min-h-screen">
      <div className="max-w-3xl mx-auto glass-effect p-8 rounded-lg animate-fade-in">
        <h1 className="text-4xl font-bold mb-8">About BlogHub</h1>
        <div className="space-y-6 text-gray-600">
          <p className="leading-relaxed">
            Welcome to BlogHub, your premier destination for insightful content across technology, 
            lifestyle, politics, career development, and literature. Our platform brings together 
            passionate writers and eager readers in a community dedicated to knowledge sharing and 
            meaningful discussions.
          </p>
          <div className="grid md:grid-cols-2 gap-8 my-12">
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Our Mission</h3>
              <p>
                To create a space where ideas flourish and knowledge flows freely, 
                connecting thought leaders with curious minds.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Our Vision</h3>
              <p>
                To become the leading platform for quality content and meaningful 
                discussions across diverse topics.
              </p>
            </div>
          </div>
          <p className="leading-relaxed">
            Join us in our journey to build a community where every voice matters and 
            every story has the power to inspire, educate, and transform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
