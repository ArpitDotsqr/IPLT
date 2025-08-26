import Wrapper from "@/components/Layout/Wrapper";
import store from "@/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken } from "@/components/utils";
import { jwtDecode } from "jwt-decode";
import { socket } from "@/socket";
import { io } from "socket.io-client";

const GOOGLE_MAPS_API_KEY = "AIzaSyA8u5U48rUOq_jL4RE5nYQBAAJnehXVnbQ";

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io("https://ipltapp.24livehost.com:3050");
    // const socket = io('https://localhost:3050');

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("notification", function (forUser, notificationDetails) {
      toast.info(notificationDetails.title);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken, "werwerwerwer");

      const { role } = decodedToken;
      if (role === "superadmin" || role === "admin") {
        if (!router.pathname.startsWith("/admin")) {
          router.push("/admin/dashboard");
        }
      } else {
        //   router.push('/');
      }
      //   } else {
      //     // if (!router.pathname.startsWith('/login')) {
      //     //   router.push('/');
      //     // }
      //     if (router.pathname.includes("/changepassword")) {
      //       router.push("/changepassword")
      //     } else if (router.pathname.includes("/forgotpassword")) {
      //       router.push("/forgotpassword")
      //     } else {
      //       router.push('/');
      //     }
    }
    setMounted(true);
  }, [router.pathname]);

  if (!mounted) return null;

  return (
    <Provider store={store}>
      <Head>
        <title>TechStack</title>
        {/* <script src={`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=infraprime&components=country:in&key=${GOOGLE_MAPS_API_KEY}`} > */}
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
          defer></script>
        {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places`} /> */}
      </Head>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}
