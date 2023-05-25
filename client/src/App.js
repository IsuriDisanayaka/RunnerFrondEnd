import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './screen/homepage/index';
import Runner from './screen/Runner/index';
import { Provider as AlertProvider, useAlert } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css';
const options = {
	position: 'top right',
	timeout: 5000,
	offset: '30px',
};
export default function App() {
	const loginStatus = localStorage.getItem("loginStatus")

	return (
		<AlertProvider template={AlertTemplate} {...options}>

			<Router>
				<div className="App">
					<Routes>
						<Route exact path='/' element={< Home />}></Route>
						<Route exact path='/runner' element={loginStatus ? < Runner /> : < Home />}></Route>
					</Routes>
				</div>
			</Router>
			<ToastContainer />

		</AlertProvider>


	);
}



