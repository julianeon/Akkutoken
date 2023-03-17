import React, { useState } from 'react'
import { abi } from './abee';
import Web3 from 'web3';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const Spacer = styled.div`
margin-top: 1vh;
margin-bottom: 1vh;
`

async function connectMeta(accounted, msged) {
    let ethereum = window.ethereum;

    try {
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const account = accounts[0];
	accounted(account);
    } catch {
	console.log("connect fail!");
	msged(<><p>Please install MetaMask and reload this page.</p></>);
    }
}

async function payMeta(sender, receiver, amount, msged) {
    //console.log(`payWithMetamask(receiver=${receiver}, sender=${sender}, amt=${amount})`)
    //let contract_address='0x347a29ea126a746c70e1ead570fddf438e66231a';
	  let contract_address='0xF5dBF10a48574F927E9f9Ba6CA799cd80F03bcA9';
    try {
        await window.ethereum.enable();
        window.web3 = new Web3(window.ethereum);
	let contractInstance = new window.web3.eth.Contract(abi, contract_address);
	const params = {
	    from: sender,
	    to: contractInstance._address,
	    data: contractInstance.methods.transfer(receiver, window.web3.utils.toWei( amount.toString() ) ).encodeABI(),
	    gas: 39000,  	    
	};
	//const sendHash = window.web3.eth.sendTransaction(params);
	window.web3.eth.sendTransaction(params).then(function(receipt) {
	    console.log(receipt);
	    msged("success");
	}).catch(function(e){
	    console.log(e);
	    console.log("failed to complete transaction.");
	    msged("fail");
	});
    }
    catch(e) {
	console.log("payment fail!");
	console.log(e);
	msged("");
	//msged(<><p>Can't connect MetaMask. Please check MetaMask.</p></>);
    }

}
 
const PayerTok = ({value,addy}) => {
	  let amount=parseInt(value);
    //const amount = 1;
    //const receiver = '0xDddcf46Ed02a81e38E1906f508CEBa65A8f3B7dD';
    const [account, setAccount] = useState("");    
    const [message, setMessage] = useState(<Button color="primary" fullWidth variant="contained" onClick={() => connectMeta(setAccount, setMessage)} >Click To Pay</Button>);

    if (account === "") {
	return (
	    <>
		{message}
	    </>
	)
    } else if (account==="fail") {
	return (
	    <>
	    <p>It seems you may have rejected the payment.</p>
	    <p>If you'd like to retry the payment, please click the button to try again.</p>
            {message}
	    </> 
         )
    } else if (account==="success") {
         return (
	    <>
	    <p>Your payment has been accepted.</p>
	    <p>We'll follow up with you about your deliverables through email.</p>
	    <p>Thank you, and have a nice day!</p>
		</>
	)
    }
    else {
	return (
		<>
		<Button fullWidth variant="contained" color="primary" onClick={() => payMeta(account, addy, amount, setAccount)} >Buy For {value} Akkutoken</Button>
		</>
	)

    }
}

export default PayerTok;
