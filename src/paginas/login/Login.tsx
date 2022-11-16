import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import { Box } from "@mui/material";
import "./Login.css";
import UserLogin from "../../models/UserLogin";
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";

function Login() {
  let history = useNavigate();

 
  const dispatch = useDispatch();
    const [token,setToken] = useState ('')
  

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
      id: 0,
      nome: '',
      usuario: '',
      foto: '',
      senha: '',
      token: '',
    })
  

  function updateModel(event: ChangeEvent<HTMLInputElement>) {

    setRespUserLogin({
      ...respUserLogin,
      [event.target.name]: event.target.value
    })

  }

  useEffect(() => {
    if (token != '') {
      dispatch(addToken(token));
      history('/home');
    }
  }, [token]);


  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(`/usuarios/logar`, respUserLogin, setToken)
      toast.success(' Usuario logado com sucesso ',{
        position: "top-right",
        autoClose:2000,
        hideProgressBar: false,
        pauseOnHover:false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    });
    } catch (error) {
      toast.error(' Dados incosistentes.Favor verificar as informações de cadastro',{
        position: "top-right",
        autoClose:2000,
        hideProgressBar: false,
        pauseOnHover:false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    });
    }

  }

  useEffect(() => {
    if (respUserLogin.token !== '') {
      dispatch(addToken(respUserLogin.token))
      dispatch(addId(respUserLogin.id.toString()))
      history('/home')
    }
  }, [respUserLogin.token])



  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid alignItems="center" xs={6}>
        <Box paddingX={20}>
          <form onSubmit={onSubmit}>
            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="textos1">
              Entrar
            </Typography>
            <TextField value={respUserLogin.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal" fullWidth />
            <TextField value={respUserLogin.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />
            <Box marginTop={2} textAlign="center">

              <Button type="submit" variant="contained" color="primary" className='logar'>
                Logar
              </Button>

            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastrousuario">
              <Typography variant="subtitle1" gutterBottom align="center" className="textos1" >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} className="imagem"></Grid>
    </Grid>
  );
}

export default Login;