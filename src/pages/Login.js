import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Header from "../components/Header"
import Footer from '../components/Footer';

const useStylesBtn = makeStyles({
  btn: {
    textTransform: "none",
    backgroundColor: '#FF9500',
    width: 200,
    fontSize: 20,
    color: '#fff',   
  }
});

const Login = (props) => {
  const classesBtn = useStylesBtn();                // ボタンのスタイル
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/mypage");
    });
    return () => unSub();
  }, [props.history]);

  return (

    <>
      <Header props/>
    
      <Box mt={5} textAlign="center">
        <Box color="inherit" mb={10} lineHeight={2}>
            サンプルメニューに興味を持っていただき、
            <br/>ありがとうございます。 <br/>
            <br/>現在メニュー開発を行っております。
            <br/>ミールキット購入環境が整い次第、
            <br/>ご案内いたしますので、ぜひご登録ください。
        </Box>
      </Box>

      <Box textAlign="center">
        <Box mb={3}>
          <TextField
            variant="outlined"
            label="email"
            type="text"
            name="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <TextField
            variant="outlined"
            label="パスワード"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mb={1}>
          <Button
            className={classesBtn.btn}
            onClick={
              isLogin
                ? async () => {
                    try {
                      await auth.signInWithEmailAndPassword(email, password);
                      props.history.push("/mypage");
                    } catch (error) {
                      alert(error.message);
                    }
                  }
                :
                  async () => {
                    try {
                      await auth.createUserWithEmailAndPassword(email, password);
                      props.history.push("/mypage");
                    } catch (error) {
                      alert(error.message);
                    }
                  }
            }
          >
            {isLogin ? "ログイン" : "会員登録"}
          </Button>
        </Box>

        <div onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "会員登録"
            : "ログインに戻る"}
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Login;