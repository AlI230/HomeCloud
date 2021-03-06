import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";
import { SocketProvider } from './socketContext'

import Home from './pages/home';
import Collection from './pages/FilesPage';
import Login from './pages/login';
import Register from './pages/register';
import MyProfile from './pages/myProfile';
import ChatsPage from './pages/ChatsPage';
import FriendsPage from './pages/friendsPage';
import SharedPage from './pages/shared';
import socketIOClient from "socket.io-client";
import EmailForm from "./pages/emailForm";
import DigitForm from "./pages/digitForm";
import NewPassword from './pages/newPassword';

export const socket = socketIOClient(`http://${process.env.REACT_APP_HOST_IP}:3030`, {transports: ['websocket']});

function App() {

  socket.on('connection', function() {
    console.log('connection');
  })

  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [ authTokens, setAuthTokens ] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <SocketProvider>
        <Router>
          <div>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/forgot' component={EmailForm} />
              <Route exact path='/digitCode/:email' component={DigitForm} />
              <Route exact path='/newPassword/:email/:digit' component={NewPassword} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/collection/folder/:foldername/:folderId' component={Collection} />
              <PrivateRoute exact path='/myprofile' component={MyProfile} />
              <PrivateRoute exact path='/friends' component={FriendsPage} />
              <PrivateRoute exact path='/chat' component={ChatsPage} />
              <PrivateRoute exact path='/chat/:chatId/:friendId' component={ChatsPage} />
              <PrivateRoute exact path='/shared' component={SharedPage} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </Router>
      </SocketProvider>
    </AuthContext.Provider>
  )
}

export default App;
