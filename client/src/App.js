import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import i18n from './i18n';
import { io } from 'socket.io-client';
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ActivatePage from './auth/ActivatePage';
import Alert from './components/alert/Alert'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getCategories, getPosts, getPostsByCategory, getSimilarPosts } from './redux/actions/postAction'

import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'



import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';

import { getUsers } from './redux/actions/userAction';


import Video from './pages/video';
import { getPrivacySettings } from './redux/actions/privacyAction';
import Bloginfo from './pages/bloginfo';
import Bloqueos404 from './components/adminitration/Bloqueos404';
import Appinfo2 from './pages/appinfo2';

import Appinfo3 from './pages/appinfo3';
import Map from './pages/Map';
import PostId from './pages/PostId';
import Message from './pages/message';

import Navbar2 from './components/header/Navbar2';
import CreateAnnoncePage from './pages/CreateAnnoncePage';
import CategoryPage from './pages/category/CategoryPage';
 
function App() {
  const { auth, status, modal, languageReducer } = useSelector(state => state)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const language = languageReducer?.language || localStorage.getItem("lang") || "en";


  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Primero refrescar el token antes de cualquier otra acción
        await dispatch(refreshToken());

        // Inicializar socket después del token
        const socket = io();
        dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });

        setLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setLoading(false);
      }
    };

    initializeApp();

    return () => {
      // Cleanup si es necesario
    };
  }, [dispatch]);

  // ✅ EFECTO PARA CARGAR DATOS CUANDO HAY TOKEN
 // App.js - Hook actualizado
 useEffect(() => {
  // Categorías disponibles para todos
  dispatch(getCategories());
}, [dispatch]);

// 📌 HOOK 2: Cargar datos del usuario (solo autenticado)
useEffect(() => {
getPosts()
getSimilarPosts()
  if (auth.token && auth.user) {
      console.log('🔐 User authenticated, loading user data...');
      dispatch(getPrivacySettings(auth.token));
      dispatch(getUsers(auth.token));
  }
}, [dispatch, auth.token, auth.user]);


  // ✅ MANEJO DE IDIOMA
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language);
    }
  }, [language]);

  // ✅ NOTIFICACIONES
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Notifications granted");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Notifications permission granted");
        }
      });
    }
  }, []);

  // ✅ MOSTRAR LOADING MIENTRAS SE INICIALIZA
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Loading...</span>
      </div>
    );
  }

  // ✅ VERIFICACIÓN DE USUARIO BLOQUEADO (CORREGIDO)
  if (auth.token && auth.user?.esBloqueado) {
    return (
      <Router>
        <Switch>
          <Route exact path="/bloqueos404" component={Bloqueos404} />
          <Route path="*" component={Bloqueos404} />
        </Switch>
      </Router>
    );
  }

  // ✅ RENDER PRINCIPAL CON REACT ROUTER v5
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>

        <div className="main">
          <Navbar2 />

          {auth.token && <SocketClient />}

          <Switch>
            {/* Rutas públicas */}
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/bloginfo" component={Bloginfo} />
            <Route exact path="/infoaplicacionn" component={Appinfo2} />
            <Route exact path="/infoaplicacionn3" component={Appinfo3} />
            <Route exact path="/creer-annonce" component={CreateAnnoncePage} />
            <Route exact path="/editer-annonce/:id" component={CreateAnnoncePage} />
            <Route exact path="/post/:id" component={PostId} />
            <Route exact path="/message" component={Message} />
            <Route exact path="/bloqueos404" component={Bloqueos404} />
            <Route exact path="/video/:obraId" component={Video} />
            <Route exact path="/Map" component={Map} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route exact path="/user/reset/:token" component={ResetPassword} />
            <Route
              exact
              path="/user/activate/:activation_token"
              component={auth.token ? ActivatePage : Login}
            />
            <Route exact path="/category/:categoryName" component={CategoryPage} />
 
 
 
       
            <PrivateRouter exact path="/profile" component={PageRender} />
            <PrivateRouter exact path="/mes-annonces" component={PageRender} />
            <PrivateRouter exact path="/creer-annonce" component={PageRender} />
            <PrivateRouter exact path="/mes-commandes" component={PageRender} />
            <PrivateRouter exact path="/tickets-livraison" component={PageRender} />
            <PrivateRouter exact path="/demandes-devis" component={PageRender} />
            <PrivateRouter exact path="/achat-store" component={PageRender} />
            <PrivateRouter exact path="/achat-publicite" component={PageRender} />
            <PrivateRouter exact path="/transactions" component={PageRender} />



            

            {/* Rutas privadas específicas */}
            <PrivateRouter exact path="/users/dashboardpage" component={PageRender} />
            <PrivateRouter exact path="/users/roles" component={PageRender} />
            <PrivateRouter exact path="/users/contactt" component={PageRender} />
            <PrivateRouter exact path="/users/bloqueados" component={PageRender} />

            {/* Rutas privadas genéricas */}
            <PrivateRouter exact path="/:page/:id/:tab" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
            <PrivateRouter exact path="/:page" component={PageRender} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;