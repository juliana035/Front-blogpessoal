import React, { useEffect, useState } from 'react'
import {Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import './DeletarPostagem.css';
import { Box } from "@mui/material";
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function DeletarPostagem() {
  let history = useNavigate();
  const { id } = useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
 
  const [post, setPosts] = useState<Postagem>()

  useEffect(() => {
      if (token == "") {
        toast.error(' Você precisa estar logado',{
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
    buscaId(`/postagens/${id}`, setPosts, {
        headers: {
          'Authorization': token
        }
      })
    }


      function sim() {
          history('/posts')
          deleteId(`/postagens/${id}`, {
            headers: {
              'Authorization': token
            }
          });
          toast.success(' Postagem deletada com sucesso',{
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
          history('/posts')
        }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} className="corzinha" variant='contained' size='large' >
                Sim
              </Button>
              </Box>
              <Box>
              <Button onClick={nao} className="corzinha2"  size='large' variant='contained' >
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
export default DeletarPostagem;