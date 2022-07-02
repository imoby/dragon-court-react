import $ from 'jquery';
import { io } from 'socket.io-client';
import Template from './template';
const socket = io();
const tpl = new Template();

$(function(){
	const loc = window.location.href;
	if(/login/.test(loc)){
		$('.nav-login').siblings().removeClass('active');
		$('.nav-login').addClass('active');
	}
	if(/register/.test(loc)){
		$('.nav-register').siblings().removeClass('active');
		$('.nav-register').addClass('active');
	}
});

$(document).on('click', '#register', function(e){
	e.preventDefault();
	
	const data = {
		username: $('input[name=username]').val(),
		email: $('input[name=email]').val(),
		password: $('input[name=password]').val()
	};
	
	socket.emit('user-register', data);
	socket.on('user-register-response', (result) => {
		let title = '', message = '', redirect = '';
		if(result.status == 'ok'){
			title = 'Success!';
			message = 'You have successfully registered an account and may now login.';
			redirect = '/user/login/';
		}else{
			title = 'Ooops!';
			message = result.message
			redirect = '/user/register/';
		}
		
		tpl.modal('register-response', title, message, () => {
			window.location.href = window.baseURL+redirect;
		});
	});
});

$(document).on('click', '#login', function(e){
	e.preventDefault();
	
	const data = {
		username: $('input[name=username]').val(),
		password: $('input[name=password]').val()
	};
	
	socket.emit('user-login', data);
	socket.on('user-login-response', (result) => {
		let title = '', message = '', callback = null;
		if(result.status == 'ok'){
			title = 'Success!';
			message = 'You have successfully logged in and will now be taken to the game.';
			callback = () => {
				window.location.href = window.baseURL+'/game/?token='+result.data.token;
			};
		}else{
			title = 'Ooops!';
			message = result.message;
			callback = () => {
				window.location.href = window.baseURL+'/user/login/';
			};
		}
		
		tpl.modal('login-response', title, message, callback);
	});
});

$(document).ready(function(){
	tpl.fbInit();
});
