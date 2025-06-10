"use client";

import { SetStateAction, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import GoToTop from "../components/GoToTop";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Image from "next/image";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showPopup]);

  const openPopup = (type: SetStateAction<string>) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when in view
    threshold: 0.3, // How much of the element should be visible
  });

  const programs = [
    {
      icon: "/assets/images/team-leader.png",
      title: "Beekeeping Management App",
      description:
        "A mobile-friendly platform for tracking hives, recording inspections, and analyzing honey production trends.",
    },
    {
      icon: "/assets/images/self-esteem.png",
      title: "Sustainable Beekeeping Initiatives",
      description:
        "We collaborate with beekeepers to implement eco-friendly practices that promote pollinator conservation.",
    },
    {
      icon: "/assets/images/teamwork.png",
      title: "Data-Driven Insights",
      description:
        "Leverage AI-powered analytics to improve hive health, detect issues early, and maximize honey yields.",
    },
    {
      icon: "/assets/images/direction.png",
      title: "Training & Community Support",
      description:
        "Workshops, mentorship programs, and a community of beekeepers to exchange knowledge and best practices.",
    },
    {
      icon: "/assets/images/growth.png",
      title: "Personal Development",
      description:
        "Our talks help people build resilience, set goals, and develop strategies to overcome challenges.",
    },
    // Add more items anytime — layout stays dynamic
  ];

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="hero_section relative z-10">
        <h1 className="bg-black/11 p-6 rounded-xl backdrop-blur-[1px] py-5 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-left my-5 font-work-sans">
          Smart Beekeeping <br /> Made Simple...
        </h1>
        <p className="bg-black/11 p-6 rounded-xl backdrop-blur-[1px] font-medium text-[20px] text-white max-w-3xl text-left break-words">
          Empower your beekeeping journey with real-time hive tracking, <br />
          honey production monitoring, and data-driven insights.
        </p>
      </section>

      {/* About Section */}
      <section className="about_section py-20 bg-white" id="about">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <figure className="about_banner md:w-1/2">
            <Image
              src="/assets/images/About_group.jpeg" // Replace with your actual image path
              width={700}
              height={532}
              loading="lazy"
              alt="about banner"
              className="w-full rounded-lg shadow-xl"
            />
          </figure>
          <div className="about_content md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative pb-4">
              About MZINGA HUB
              <span className="absolute bottom-0 left-0 w-20 h-1 bg-amber-500"></span>
            </h2>
            <p className="text-gray-600 mb-6">
              MzingaHub is a powerful beekeeping management platform designed to
              help beekeepers track hive health, optimize honey production, and
              enhance sustainability. Whether you&apos;re a beginner or an
              experienced beekeeper, our intuitive tools provide everything you
              need to manage your apiary with ease.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">
                  Hive Monitoring – Track hive conditions, colony strength, and
                  activity levels.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">
                  Honey Production Insights – Get real-time data on yields and
                  efficiency.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">
                  Smart Alerts – Receive notifications on hive health and
                  environmental changes.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">
                  Sustainable Beekeeping – Support eco-friendly practices for
                  thriving colonies.
                </span>
              </li>
            </ul>
            <ul ref={ref} className="flex flex-wrap gap-6">
              <li className="stats_card bg-amber-50 p-6 rounded-lg text-center min-w-[120px]">
                <p className="text-3xl font-bold text-amber-600">
                  {inView ? <CountUp end={300} duration={2} /> : "0"}+
                </p>
                <p className="text-gray-600">Farms Visited</p>
              </li>
              <li className="stats_card bg-amber-50 p-6 rounded-lg text-center min-w-[120px]">
                <p className="text-3xl font-bold text-amber-600">
                  {inView ? (
                    <CountUp end={5000} duration={3} separator="," />
                  ) : (
                    "0"
                  )}
                  +
                </p>
                <p className="text-gray-600">Farmers Reached</p>
              </li>
              <li className="stats_card bg-amber-50 p-6 rounded-lg text-center min-w-[120px]">
                <p className="text-3xl font-bold text-amber-600">
                  {inView ? <CountUp end={3} duration={1.5} /> : "0"}
                </p>
                <p className="text-gray-600">Years Completed</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="programs_section py-20 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center relative pb-4">
            Our Programs
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-500"></span>
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="card_icon mb-4">
                  <Image
                    src={program.icon}
                    width={48}
                    height={48}
                    loading="lazy"
                    alt={`${program.title} icon`}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <button className="text-amber-600 font-medium flex items-center hover:text-amber-700">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="impact_section py-20 bg-white" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center relative pb-4">
            Our Impact
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-500"></span>
          </h2>

          <div className="text-left">
            <p className="text-gray-600 mb-6">
              MzingaHub is transforming beekeeping by:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">🐝</span>
                <span className="text-gray-600">
                  Supporting over 5000+ beekeepers across different regions.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">🌎</span>
                <span className="text-gray-600">
                  Enhancing pollination and biodiversity through sustainable
                  practices.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">🍯</span>
                <span className="text-gray-600">
                  Increasing honey production efficiency with smart data
                  tracking.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">💡</span>
                <span className="text-gray-600">
                  Educating communities about the importance of bees in our
                  ecosystem.
                </span>
              </li>
            </ul>

            <p className="text-gray-600 mb-8">
              Here are just a few examples of the impact that Mzinga Hub has had
              on the lives of beekeepers in Kajiado County:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Testimonial 1 */}
            <div className="impact_card bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="impact_icon bg-amber-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 italic">
                    &quot;MzingaHub has helped me increase my honey yield by 30%
                    while keeping my hives healthier than ever!&quot;
                  </p>
                  <p className="text-gray-800 font-medium mt-3">
                    [Name], [Farm Name]
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="impact_card bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="impact_icon bg-amber-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 italic">
                    &quot;The training from MzingaHub completely transformed how
                    I manage my apiary. My production has doubled!&quot;
                  </p>
                  <p className="text-gray-800 font-medium mt-3">
                    [Name], [Farm Name]
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-left">
            <p className="text-gray-600 mb-8">
              We are proud of the impact that we have had on the lives of
              beekeepers in Kajiado County, and we are committed to continuing
              our work to empower even more in the future.
            </p>

            <p className="text-gray-600 mb-12">
              But don&apos;t just take our word for it. Here are some
              testimonials from Farmers, neighbouring communities and partners
              who have seen the impact of Mzinga Hub&apos;s programs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 3 */}
            <div className="impact_card bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="impact_icon bg-amber-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 italic">
                    &quot;As a community leader, I&apos;ve seen how MzingaHub
                    has brought new economic opportunities to our area.&quot;
                  </p>
                  <p className="text-gray-800 font-medium mt-3">
                    [Name], Community Leader
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="impact_card bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="impact_icon bg-amber-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 italic">
                    &quot;Partnering with MzingaHub has allowed us to scale our
                    conservation efforts while supporting local
                    livelihoods.&quot;
                  </p>
                  <p className="text-gray-800 font-medium mt-3">
                    [Name], Conservation Partner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="involve_section py-20 bg-gray-50" id="involved">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center relative pb-4">
            Get Involved
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-500"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Volunteer Card */}
            <div className="involve_card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Volunteer
              </h3>
              <p className="text-gray-600 mb-6">
                At Mzinga Hub, we welcome passionate individuals ready to drive
                change through innovation and community engagement. Whether
                you&apos;re a mentor, educator, tech enthusiast, or someone
                eager to uplift young minds, your contribution can create a
                lasting impact.
              </p>
              <button
                onClick={() => openPopup("volunteer")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Apply
              </button>
            </div>

            {/* Donate Card */}
            <div className="involve_card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Donate
              </h3>
              <p className="text-gray-600 mb-6">
                Your support fuels transformation. Every donation to Mzinga Hub
                helps provide youth with access to digital tools, training, and
                opportunities that shape a brighter future. No amount is too
                small—each contribution brings us closer to a more inclusive
                community.
              </p>
              <button
                onClick={() => openPopup("donate")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Donate
              </button>
            </div>

            {/* Partner Card */}
            <div className="involve_card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Partner with us
              </h3>
              <p className="text-gray-600 mb-6">
                Are you a brand, business, or organization aligned with our
                vision of tech-powered growth and youth leadership? Let&apos;s
                collaborate! At Mzinga Hub, we value partnerships that amplify
                impact and create sustainable opportunities.
              </p>
              <button
                onClick={() => openPopup("partner")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Contact Us
              </button>
            </div>

            {/* Adopt a Hive Card */}
            <div className="involve_card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Adopt a Hive
              </h3>
              <p className="text-gray-600 mb-6">
                Support sustainable beekeeping by adopting a hive or apiary.
                Your support enables young farmers to learn and earn through
                eco-friendly practices that nurture both the environment and
                livelihoods.
              </p>
              <button
                onClick={() => openPopup("adopt")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              We believe that every farmer and youth deserves access to
              opportunities that unlock their full potential. With your support,
              we can turn bold ideas into real-world solutions. Thank you for
              standing with Mzinga Hub.
            </p>
          </div>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <div className="popup_overlay fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="popup bg-white p-8 rounded-lg max-w-md w-full mx-4 shadow-lg relative z-[10000]">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {popupType === "volunteer" && "Apply as a Volunteer"}
              {popupType === "donate" && "Make a Donation"}
              {popupType === "partner" && "Partner With Us"}
              {popupType === "adopt" && "Adopt a Hive or Apiary"}
            </h3>
            <p className="text-gray-600 mb-6">
              Please fill out the form below:
            </p>

            <form
              action="https://formspree.io/f/movwepop"
              method="POST"
              className="popup_form space-y-4"
            >
              {/* Hidden fields */}
              <input
                type="hidden"
                name="_subject"
                value="New Mzinga Hub Inquiry"
              />
              <input
                type="hidden"
                name="_next"
                value="https://mzinga-hub.vercel.app/thank-you"
              />
              {/* User input fields */}
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Submit
              </button>
            </form>

            <button
              onClick={closePopup}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Blogs & News Section */}
      <section className="blog_section py-20 bg-gray-50" id="blog">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center relative pb-4">
            Our Blogs & News
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-500"></span>
          </h2>

          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Latest in Beekeeping Innovation. Stay updated with expert insights,
            industry trends, and MzingaHub&apos;s latest developments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Blog Post 1 */}
            <div className="blog_card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <figure className="blog_banner">
                <a href="#">
                  <Image
                    src="/assets/images/blog1.jpeg"
                    width={750}
                    height={350}
                    loading="lazy"
                    alt="How AI is Changing Beekeeping"
                    className="w-full h-48 object-cover"
                  />
                </a>
              </figure>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <a
                    href="#"
                    className="hover:text-amber-600 transition duration-300"
                  >
                    Blog Post
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  How AI is Changing Beekeeping
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <time dateTime="2023-03-07">7 March, 2023</time>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center" aria-label="Comment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>15</span>
                    </button>
                    <button aria-label="Share">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="blog_card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <figure className="blog_banner">
                <a href="#">
                  <Image
                    src="/assets/images/blog2.jpeg"
                    width={750}
                    height={350}
                    loading="lazy"
                    alt="MzingaHub's Latest Features"
                    className="w-full h-48 object-cover"
                  />
                </a>
              </figure>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <a
                    href="#"
                    className="hover:text-amber-600 transition duration-300"
                  >
                    Event
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  MzingaHub&apos;s Latest Features
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <time dateTime="2023-03-07">7 March, 2023</time>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center" aria-label="Comment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>15</span>
                    </button>
                    <button aria-label="Share">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="blog_card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <figure className="blog_banner">
                <a href="#">
                  <Image
                    src="/assets/images/blog3.jpeg"
                    width={750}
                    height={350}
                    loading="lazy"
                    alt="Sustainable Beekeeping Tips"
                    className="w-full h-48 object-cover"
                  />
                </a>
              </figure>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <a
                    href="#"
                    className="hover:text-amber-600 transition duration-300"
                  >
                    Photo Gallery
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  Sustainable Beekeeping Tips
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <time dateTime="2023-03-07">7 March, 2023</time>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center" aria-label="Comment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>15</span>
                    </button>
                    <button aria-label="Share">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Post 4 */}
            <div className="blog_card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <figure className="blog_banner">
                <a href="#">
                  <Image
                    src="/assets/images/blog4.jpeg"
                    width={750}
                    height={350}
                    loading="lazy"
                    alt="Beekeepers' Success Stories"
                    className="w-full h-48 object-cover"
                  />
                </a>
              </figure>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <a
                    href="#"
                    className="hover:text-amber-600 transition duration-300"
                  >
                    Video
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  Beekeepers&apos; Success Stories
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <time dateTime="2023-03-07">7 March, 2023</time>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center" aria-label="Comment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>15</span>
                    </button>
                    <button aria-label="Share">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <GoToTop />
    </>
  );
}
