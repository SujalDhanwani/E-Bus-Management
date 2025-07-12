import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHeadset,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import axios from "axios";
import busImage from "../assets/bus.jpg";

const Home = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalBuses: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop
        autoplay={{ delay: 5000 }}
        className="relative w-full h-[85vh]"
      >
        <SwiperSlide>
          <div
            className="w-full h-full flex items-center justify-center bg-center bg-cover"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${busImage})`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white px-4"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 to-pink-500 text-transparent bg-clip-text">
                Welcome to E-Bus Management
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                Book your tickets, track buses live, and travel smarter.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/login"
                  className="bg-white text-black px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-gray-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-lg font-medium shadow text-white transition"
                >
                  Register
                </Link>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white px-4"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center space-x-3">
                <FaShieldAlt className="text-yellow-400 animate-pulse" size={36} />
                <span>Why Choose Us?</span>
              </h2>
              <p className="max-w-xl mx-auto mb-6 text-lg">
                Hassle-free booking, live tracking, secure payments, and dedicated 24/7 support.
              </p>
              <Link
                to="/register"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow transition"
              >
                Join Now
              </Link>
            </motion.div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Features Section */}
      <section className="bg-white py-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center px-6 md:px-12">
        {[
          { icon: <FaTicketAlt size={30} />, title: "Easy Booking", text: "Book tickets in seconds." },
          { icon: <FaMapMarkerAlt size={30} />, title: "Live Tracking", text: "Track buses in real time." },
          { icon: <FaShieldAlt size={30} />, title: "Secure Payments", text: "100% safe transactions." },
          { icon: <FaHeadset size={30} />, title: "Support", text: "24/7 customer help." },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3 inline-block">
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
            <p className="text-gray-600">{f.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <p className="text-4xl font-bold">
              <CountUp end={stats.totalBookings} duration={2} />+
            </p>
            <p>Tickets Booked</p>
          </div>
          <div>
            <p className="text-4xl font-bold">
              <CountUp end={stats.totalUsers} duration={2} />+
            </p>
            <p>Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-bold">
              <CountUp end={stats.totalBuses} duration={2} />+
            </p>
            <p>Buses Managed</p>
          </div>
          <div>
            <p className="text-4xl font-bold">24/7</p>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "Amazing experience booking tickets easily!",
            "Live tracking helped me save time.",
            "Super secure and fast payments.",
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              <p className="italic">"{text}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Sujal Dhanwani</p>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/sujaldhanwani"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://www.instagram.com/sujaldhanwani"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
