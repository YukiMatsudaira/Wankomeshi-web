import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Papyrus from "../img/wankomeshi.png";
import useMedia from 'use-media';
import Grid from '@material-ui/core/Grid';

const useTop = makeStyles({
  img : {
    backgroundImage: `url(${Papyrus})`,
    backgroundSize: "100% auto",
    backgroundRepeat: "no-repeat",
  },
});

const useStyles = makeStyles({
  root: {
    maxWidth: 542,
    margin: "auto",
    marginBottom: "50px",
    padding: "5px",
  },
  media: {
    height: 140,
  },
});

function Select(props) {
  const isWide = useMedia({minWidth: '500px'});
  const topstyles = useTop();
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const[images, setImage]= useState([
    {
        id: "",
        name: "",
        image: "",
    }
  ])

  useEffect(() => {
    const firebaseData = db.collection("recipe").onSnapshot((snapshot)=>
    setImage(
      snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
      }))
    ))

    return () => {
      firebaseData();
    }
  }, [])
  
  return (
    <div>
      <Header props/>
     
      <Box
        width="100vw"
        height={isWide ? "50vw" : "210px"} 
        className={topstyles.img}
        mb={5}>
      </Box>

      <Box fontWeight="fontWeightBold" textAlign="center" fontSize={20} color="#2b2a2a" style={{ textDecoration: 'underline' }}>サンプルメニュー</Box>

      {isWide
        ?
        <Grid container spacing={2} columns={16} justifyContent="center">
          {images.map((getImage)=>(
            <Grid key={getImage.id}>
              <Box mt={5} mb={5} mx={10}>
                <Card className={classes.root}>
                  <CardMedia>
                    <CardMedia
                    component="img"
                    alt="レシピ画像"
                    width="542"
                    height="542"
                    image={getImage.image}
                    title={getImage.name}
                    onClick={()=> {props.history.push({ pathname: 'recipe', state: getImage.id })}}
                    />
                  </CardMedia>

                  <Box textAlign="center">
                    <CardContent>
                      <Typography variant="body2" component="p">
                        <Box fontWeight="fontWeightBold" fontSize={15} color="#2b2a2a">{getImage.name}</Box>
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        : 
        <Slider {...settings}>
          {images.map((getImage)=>(
          <Box key={getImage.id}>
            <Box m={1} >
              <Card className={classes.root}>
                <CardMedia>
                  <CardMedia
                  component="img"
                  alt="レシピ画像"
                  width="300"
                  height="200"
                  image={getImage.image}
                  title={getImage.name}
                  onClick={()=> {props.history.push({ pathname: 'recipe', state: getImage.id })}}
                  />
                </CardMedia>

                <Box textAlign="center">
                  <CardContent>
                    <Typography variant="body2" color="inherit" component="p">
                      {getImage.name}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          </Box>
          ))}
        </Slider>
      }

      <Footer />
    </div>
  );
}

export default Select
