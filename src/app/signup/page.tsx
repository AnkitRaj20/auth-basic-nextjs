"use client";
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import { Axios } from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function signup(){
    const[user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    const onSignUp =async () => {
        
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-align-center">SignUp</h1>
            

            <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control type="text" placeholder="Enter email" 
        id="username"
        value={user.username}
        onChange={
            (e) => setUser({
                ...user,
                username: e.target.value
            })
        }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        id="password"
        value={user.password}
        onChange={
            (e) => setUser({
                ...user,
                password: e.target.value
            })
        }
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        id="password"
        value={user.password}
        onChange={
            (e) => setUser({
                ...user,
                password: e.target.value
            })
        }
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={onSignUp}>
        SignUp
      </Button>
    </Form>
    <Link href="/login">Login</Link>
        </div>
    )
}