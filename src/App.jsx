import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Updated import
import Header from './components/Header';
import './App.css';
import HomePage from './Pages/HomePage.jsx';
import { makeStyles } from '@mui/styles';
import CoinsPage from './Pages/CoinsPage.jsx';
import Alert from './components/Alert.jsx';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/coins/:id" element={<CoinsPage />} /> 
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Header from "./components/Header";
// import "./App.css";
// import HomePage from "./Pages/HomePage.jsx";
// import CoinsPage from "./Pages/CoinsPage.jsx";
// import AuthPage from "./Pages/AuthPage.jsx";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles(() => ({
//   App: {
//     backgroundColor: "#14161a",
//     color: "white",
//     minHeight: "100vh",
//   },
// }));

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/auth" />;
//   }

//   return children;
// };

// // Create a layout component that conditionally renders the header
// const Layout = () => {
//   const location = useLocation();
//   const classes = useStyles();
//   const isAuthPage = location.pathname === '/auth';

//   return (
//     <div className={classes.App}>
//       {!isAuthPage && <Header />}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <HomePage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/coins/:id"
//           element={
//             <ProtectedRoute>
//               <CoinsPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/auth" element={<AuthPage />} />
//       </Routes>
//     </div>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Layout />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;