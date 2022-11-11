import React, { useEffect } from 'react';
import {Typography,Grid, Button} from '@material-ui/core';
import './Home.css';
import { Box } from '@mui/material';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home(){
    let history = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    
    
    useEffect(() => {
      if (token == "") {
       
        toast.error(' você precisa estar logado',{
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
    return (
       <>
      <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'> expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem/>
                        </Box>
                        <Link to="/posts" className = "text-decorator-none">
                             <Button variant="outlined" className='botao'>Ver Postagens</Button>
                         </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://i.imgur.com/nS1aqNO.jpg" alt="" width="600px" height="550px" />
                </Grid>
                <Grid xs={12} className='postagens'>
                    <TabPostagem/>
                </Grid>
            </Grid>
                
     </>

    );

}
export default Home;