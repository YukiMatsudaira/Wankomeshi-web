import React, { useEffect } from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";

const useStylesBtn = makeStyles({
    btn: {
        textTransform: "none",
        backgroundColor: '#FF9500',
        width: 200,
        fontSize: 20,
        color: '#fff',   
    }
});

function Mypage(props) {

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
            !user && props.history.push("login"); //localhost:xxxx/login
        });

        return () => unSub();
        }, [props.history]);

    const classesBtn = useStylesBtn();

    return (
        <div>
        <Header props/>
            <Box mt={10} textAlign="center">
                <Box fontWeight="fontWeightBold" fontSize={30} color="inherit" mb={3}>COMING SOON！</Box>
                <Box color="inherit" mb={10} lineHeight={2}>ご登録ありがとうございます。
                    <br/>現在メニュー開発を行っております。
                    <br/>ミールキット購入環境が整い次第、
                    <br/>ご登録のメールアドレスにご連絡します。
                    <br/>お楽しみに、今しばらくお待ちください。</Box>
                <Box mb={1}>
                    <Button
                        className={classesBtn.btn}
                        onClick={async () => {
                        try {
                            await auth.signOut();
                            props.history.push("login");
                        } catch (error) {
                            alert(error.message);
                        }
                        }}
                    >
                    ログアウト
                    </Button>
                </Box>
            </Box>
        <Footer />
        </div>
    );
}

export default Mypage
