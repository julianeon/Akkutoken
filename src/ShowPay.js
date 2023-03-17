import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import Background from './Background';
import PayerTok from './PayerTok';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.css';

const ustyle = {
    fontFamily: 'Unbounded, cursive',
}

const papersty = {
    marginTop: '2vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const mini = {
  fontSize: 'small',
  color: 'blue',
}


const PayNow = () => {
    let amount="750";
    const address="0xbdb7a86Fe2f992a887F8fCf093d06955BC759C08";
    return (
      <>
      <p>Click below to see the payment flow when using Akkutoken on your website.</p>
      <p>The user must have MetaMask installed to pay.</p>
      <PayerTok value={amount} addy={address}/>
      </>
    )
}

const Webcontent = () => {
    let name="Mini Blocks People";

    let amount="9000";
    const address="0xbdb7a86Fe2f992a887F8fCf093d06955BC759C08";
	  return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div style={papersty}>
		<Grid container spacing={2}>
		<Grid item xs={12}>
      <img src="lego_people.png" alt="mecha robot woman"/>
      <p style={ustyle}>{name}</p>
      <p>9 piece set. </p>
      <p style={ustyle}>Price</p>
      <p>9000 Akkutoken</p>
      <p style={ustyle}>Address</p>
      <p><span style={mini}>{address}</span></p>
      <PayNow/>
		</Grid>
		</Grid>
    </div>
		</Container>
	)
}

const ShowPay = () => {
	return (
		<Background text="mesh_blue.jpg">
		<Webcontent/>
		</Background>
	)
}

export default ShowPay;
