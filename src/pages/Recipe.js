import React, { useState, useEffect } from 'react'
import { db } from "../firebase";
import ReactPlayer from 'react-player'
import Header from "../components/Header"
import Footer from "../components/Footer"
import useMedia from 'use-media';
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";

const useStylesBtn = makeStyles({
    btn: {
        textTransform: "none",
        backgroundColor: '#FF9500',
        width: 250,
        fontSize: 20,
        color: '#fff',   
    }
});

const useStyles = makeStyles({
    table: {
      minWidth: 250,
    },
  });

function Recipe(props) {
    const classesBtn = useStylesBtn(); 
    const classes = useStyles();
    const isWide = useMedia({minWidth: '500px'});

    // video
    const[video, setVideo]= useState([
        {
            id: "",
            video: "",
        }
    ])
    useEffect(() => {
        const firebaseVideoData = db.collection("recipe").doc(props.location.state).collection("video").onSnapshot((snapshot)=>
        setVideo(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                video: doc.data().url,
            }))
        ))

        return () => {
            firebaseVideoData();
        }
    }, [props.location.state])

    // ingredient
    const[ingredient, setIngredient]= useState([
        {
            id: "",
            name: "",
            amount: "",
        }
    ])
    useEffect(() => {
        const firebaseIngredientData = db.collection("recipe").doc(props.location.state).collection("ingredient").onSnapshot((snapshot)=>
        setIngredient(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                amount: doc.data().amount,
            }))
        ))

        return () => {
            firebaseIngredientData();
        }
    }, [props.location.state])

    // how
    const[how, setHow]= useState([
        {
            id: "",
            num: "",
            contents: "",
        }
    ])
    useEffect(() => {
        const firebaseHowData = db.collection("recipe").doc(props.location.state).collection("how").orderBy('num').onSnapshot((snapshot)=>
        setHow(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                num: doc.data().num,
                contents: doc.data().contents,
            }))
        ))

        return () => {
            firebaseHowData();
        }
    }, [props.location.state])

    return (
        <div>
            <Header props/>
            
            <Box display="flex" justifyContent="center">
            {video.map((getVideo)=>(
                <ReactPlayer key={getVideo.id}
                    url={getVideo.video}
                    id="MainPlay"
                    loop={false}
                    playing={false}
                    controls={true}
                    width={isWide ? "810px" : "289px"}
                    height={isWide ? "540px" : "193px"}
                />
            ))}
            </Box>

            <Box m={3} display="flex" justifyContent="center">
                <TableContainer style={isWide ? {width:"60%"} : {width:"100%"}} component={Paper}>
                    <Box m={1} fontWeight="fontWeightBold" color="inherit" variant="h5">材料</Box>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableBody>
                        {ingredient.map((getIngredient)=>(
                            <TableRow key={getIngredient.id}>
                            <TableCell component="th" scope="row">
                                {getIngredient.name}
                            </TableCell>
                            <TableCell align="right">{getIngredient.amount}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box m={3} display="flex" justifyContent="center">
                <TableContainer style={isWide ? {width:"60%"} : {width:"100%"}}  component={Paper}>
                    <Box m={1} fontWeight="fontWeightBold" color="inherit" variant="h5">作り方</Box>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableBody>
                        {how.map((getHow) => (
                            <TableRow key={getHow.id}>
                            <TableCell component="th" scope="row">
                                {getHow.num}
                            </TableCell>
                            <TableCell align="left">{getHow.contents}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box textAlign="center" mb={10}>
                <Button className={classesBtn.btn}
                onClick={async () => {
                    try {
                      props.history.push("login");
                    } catch (error) {
                      alert(error.message);
                    }
                  }}
                  >カートに入れる</Button>
            </Box>

            <Footer />
        </div>
    )
}

export default Recipe
