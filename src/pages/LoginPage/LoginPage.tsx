import React, { useState } from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FormText, Button, Label, FormGroup, FormFeedback, Alert } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import DefaultTemplate from "../../templates/DefaultTemplate/DefaultTemplate";
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data:any) => {
    setLoading(true);

    const { email, password } = data;

    console.log({ email, password })

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      const authResponse = await response.json();

      if (authResponse.token) {
        signIn(authResponse);
      } else {
        setErrorMsg(authResponse.msg || "Something went wrong. Please try again")
      }
      
    } catch(err:any) {
      setErrorMsg(err.message || "Something went wrong. Please try again");
      // Temporarily sign in with dummy token in case of error. because fakestoreapi login api is causing some errors
      // signIn({
      //   token: "dummyToken",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <DefaultTemplate>
        <div className="container d-flex justify-content-center">
          <div className={classNames(styles.LoginBox, 'p-4')}>
            <h2 className="mt-0">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>Username/Email</Label>
                <input
                  className={`form-control ${errors.email && "is-invalid"}`}
                  type="text"
                  defaultValue=""
                  {...register("email", { required: true })}
                />
                <FormFeedback>Email is required</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <input
                  className={`form-control ${errors.password && "is-invalid"}`}
                  type="password"
                  defaultValue=""
                  {...register("password", { required: true })}
                />
                <FormFeedback>Password is required</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Button
                  block
                  className="d-flex justify-content-center"
                  type="submit"
                  disabled={loading}
                  color="primary"
                  size="lg"
                  >
                  <span className="d-flex justify-content-center align-items-center">
                    {loading && <div className="spinner me-2" />}
                    <span>Login</span>
                  </span>
                </Button>
              </FormGroup>
            </form>

            <FormText className="mt-2">
              Username: <strong>mor_2314</strong> & Password: <strong>83r5^_</strong> provides by fakestoreapi.
            </FormText>

            {errorMsg && <Alert className="mt-2" color="danger">{errorMsg}</Alert>}

            {/* <p className={classNames(styles.SingUpText, 'mb-0 mt-3')}>
              New Member? <Link to="#">Singup now</Link>
            </p> */}
          </div>
        </div>
      </DefaultTemplate>
    </>
  );
};

export default LoginPage;
