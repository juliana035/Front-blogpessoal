import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import { Box } from "@mui/material";
import './DeletarTema.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function DeletarTema() {
  let history = useNavigate();
    const { id } = useParams<{id: string}>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
  

    const [tema, setTemas] = useState<Tema>()

    useEffect(() => {
        if (token == "") {
          toast.error(' Você precisa estar logado ',{
            position: "top-right",
            autoClose:2000,
            hideProgressBar: false,
            pauseOnHover:false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
            history("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTemas, {
            headers: {
              'Authorization': token
            }
          })
        }

        function sim() {
            history('/temas')
            deleteId(`/temas/${id}`, {
              headers: {
                'Authorization': token
              }
            });
            toast.success(' Tema deletada com sucesso',{
              position: "top-right",
              autoClose:2000,
              hideProgressBar: false,
              pauseOnHover:false,
              draggable: false,
              theme: "colored",
              progress: undefined,
          });
          }
        
          function nao() {
            history('/temas')
          }
          
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="botaosim" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button  onClick={nao} variant="contained" className= 'botaonao' size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTema;