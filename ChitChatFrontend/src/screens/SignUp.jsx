import { useLayoutEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";
import api from "../core/api";
import useGlobal from "../core/global";
import { SIGNUP, USERNAME_AVAILABILITY } from "../utils/endpoint";


function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [password1Error, setPassword1Error] = useState('')
    const [password2Error, setPassword2Error] = useState('')

    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null)

    const login = useGlobal(state => state.login)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    async function onUsernameBlurHandler() {
        var response = undefined
        if (username.length < 5) {
            setUsernameError('Username must be >= 5 characters')
            return false
        }
        try {
            response = await api({
                method: 'GET',
                url: USERNAME_AVAILABILITY + "?username=" + username,
            })
        } catch (error) {
            console.log("in sign up error ")
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
            return false
        }

        if (response.data.is_username_available) {
            setIsUsernameAvailable("Username is available")
            return true
        }
        else {
            setUsernameError("Username not available")
            return false
        }
    }

    async function onSignUp() {
        //check username
        const failUsername = !username || username.length < 5

        if (failUsername) {
            setUsernameError('Username must be >= 5 characters')
        }

        //check first name
        const failFirstname = !firstName

        if (failFirstname) {
            setFirstNameError('First name was Not Provided')
        }

        // check last name
        const failLastname = !lastName

        if (failLastname) {
            setLastNameError('Last name was Not Provided')
        }

        //check password1
        const failPassword1 = !password1 || password1.length < 8

        if (failPassword1) {
            setPassword1Error('Password is too short')
        }

        //check password
        const failPassword2 = password1 !== password2

        if (failPassword2) {
            setPassword2Error('password don\'t match')
        }


        if (failUsername ||
            failFirstname ||
            failLastname ||
            failPassword1 ||
            failPassword2
        ) {
            return
        }

        //checking if username is available
        if (!isUsernameAvailable) {
            //checking again if user have changed the username
            const usernameAvailability = await onUsernameBlurHandler()
            if (!usernameAvailability) {
                return
            }
        }

        api({
            method: 'POST',
            url: SIGNUP,
            data: {
                username: username,
                first_name: firstName,
                last_name: lastName,
                password: password1
            }
        })
            .then(response => {
                const credentials = {
                    username: username,
                    password: password1
                }
                utils.log("Sign up: ", response.data)
                login(credentials, response.data.user)
            })
            .catch(error => {
                console.log("in sign up error ")
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

        <SafeAreaView style={{
            flex: 1
        }}
        >
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 16
                    }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                marginBottom: 24,
                                fontSize: 36,
                                fontWeight: 'bold',
                                color: 'black'
                            }}
                        >
                            Sign Up
                        </Text>
                        <Input
                            title='Username'
                            value={username}
                            error={usernameError}
                            setValue={setUsername}
                            setError={setUsernameError}
                            onBlurHandler={onUsernameBlurHandler}
                            isInputValid={isUsernameAvailable}
                            setIsInputValid={setIsUsernameAvailable}

                        />

                        <Input
                            title='First Name'
                            value={firstName}
                            error={firstNameError}
                            setValue={setFirstName}
                            setError={setFirstNameError}
                        />

                        <Input
                            title='Last Name'
                            value={lastName}
                            error={lastNameError}
                            setValue={setLastName}
                            setError={setLastNameError}
                        />

                        <Input
                            title='Password'
                            value={password1}
                            error={password1Error}
                            setValue={setPassword1}
                            setError={setPassword1Error}
                            secureTextEntry={true}
                        />

                        <Input
                            title='Retype Password'
                            value={password2}
                            error={password2Error}
                            setValue={setPassword2}
                            setError={setPassword2Error}
                            secureTextEntry={true}
                        />

                        <Button
                            title='Sign Up'
                            onPress={onSignUp}
                        />
                        <Text style={{ textAlign: 'center', marginTop: 40 }}>
                            Already have an account? <Text
                                style={{ color: 'blue' }}
                                onPress={() => navigation.goBack()}
                            >
                                SignIn
                            </Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen