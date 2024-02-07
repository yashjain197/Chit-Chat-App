import { useLayoutEffect, useState } from "react";
import { 
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView, 
    Text, 
    TouchableWithoutFeedback, 
    View 
} from "react-native";
import Title from "../common/Title";
import Input from "../common/Input";
import Button from "../common/Button";
import api from "../core/api";
import utils from '../core/utils'
import useGlobal from "../core/global";
import { SIGNIN } from "../utils/endpoint"

function SignInScreen({ navigation }){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const login = useGlobal(state => state.login)

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false
        })
      }, [])

    function onSignIn(){

        //check username
        const failUsername = !username

        if(failUsername){
            setUsernameError('Username Not Provided')
        }

        //check password
        const failPassword = !password

        if(failPassword){
            setPasswordError('Password Not Provided')
        }
        //break out of this function if there were any issue
        if (failUsername || failPassword){
            return
        }
        console.log("in sign in ")
        //make sign in request
        // ...
        api({
            method: 'POST',
            url: SIGNIN,
            data : {
                username: username,
                password: password
            }
        })
        .then(response => {
            const credentials = {
                username: username,
                password: password
            }
            utils.log("Sign in: ", response.data)
            login(credentials, response.data.user)
        })
        .catch(error =>{
            console.log("in sign in error ")
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        })
        
    }

    return (
        <SafeAreaView style = {{flex: 1}}>
            <KeyboardAvoidingView  behavior="height" style = {{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View 
                        style = {{
                            flex: 1, 
                            justifyContent: 'center', 
                            paddingHorizontal:20
                        }}
                    >
                        <Title 
                            text= 'ChitChat'    
                            color = '#202020'
                        />

                        <Input 
                            title = 'Username'
                            value = {username}
                            error = {usernameError}
                            setValue = {setUsername}
                            setError = {setUsernameError}
                        />
                        <Input 
                            title = 'Password'
                            value = {password}
                            error = {passwordError}
                            setValue = {setPassword}
                            setError = {setPasswordError}
                            secureTextEntry = {true}

                        />

                        <Button 
                            title = 'Sign In' 
                            onPress = {onSignIn}
                        />

                        <Text style = {{ textAlign: 'center', marginTop: 40 }}>
                            Don't have an account? <Text 
                                style = {{ color: 'blue' }}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                SignUp
                            </Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignInScreen