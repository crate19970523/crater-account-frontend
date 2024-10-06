import {useEffect, useState} from "react";
import {Box, FormControl, Paper, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid2';

const Login = () => {
    const [account, setAccount] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginButtonLoading, setIsLoginButtonLoading] = useState<boolean>(false);
    useEffect(() => {
        console.log("window.location.href: " + JSON.stringify(window.location.href));
    }, [])

    const doLogin = async () => {
        // 这里可以添加实际的登录逻辑，例如 API 调用
        if (!account || !password) {
            alert("帳號密碼不可為空")
            return;
        }
        setIsLoginButtonLoading(true);
        const url: string = '/api/validateController/login';
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": account,
                "password": password
            })
        };

        await fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) throw new Error('帳號密碼錯誤');
                    else throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            }).then(data => {
                const redirectUri: string | null = getCallBackFromURL();
                console.log("redirectUri: " + redirectUri);
                window.location.href = getCallBackFromURL() + "?token=" + data.token;
            }).catch(error => {
                alert(error)
            });
        setIsLoginButtonLoading(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Paper elevation={3} sx={{
                minHeight: '80vh',
                maxWidth: '60vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FormControl>
                    <Box sx={{marginLeft: '10px'}}>
                        <Grid container spacing={2}>
                            <Grid size={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h1>Crater 登入</h1>
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    name="account"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    label="帳號"
                                    sx={{width: '90%'}}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="密碼"
                                    type="password"
                                    sx={{width: '90%'}}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid size={10} sx={{display: 'flex', justifyContent: 'right'}}>
                                <LoadingButton
                                    variant="contained"
                                    color="primary"
                                    loading={isLoginButtonLoading}
                                    onClick={doLogin}
                                >
                                    登入
                                </LoadingButton>
                            </Grid>
                            <Grid size={2}></Grid>
                        </Grid>
                    </Box>
                </FormControl>
            </Paper>
        </Box>
    );
};

const getCallBackFromURL = () => {
    console.log("in getCallBackFromURL" )
    const result: string | null = new URLSearchParams(location.search).get('redirect_uri');
    console.log(result);
    return result;
}
export default Login;