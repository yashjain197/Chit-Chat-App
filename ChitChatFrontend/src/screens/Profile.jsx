import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, Image, TouchableOpacity } from "react-native";
import useGlobal from "../core/global";

function ProfileLogout() {
    const logout = useGlobal(state => state.logout)
    return (
        <TouchableOpacity
            onPress={logout}
            style={{
                flexDirection: 'row',
                height: 52,
                borderRadius: 26,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 26,
                backgroundColor: '#202020',
                marginTop: 40
            }}  
        >
            <FontAwesomeIcon
                icon='right-from-bracket'
                size={20}
                color='#d0d0d0'
                style={{ marginRight: 12 }}
            />
            <Text
                style = {{
                    fontWeight: 'bold',
                    color: '#d0d0d0'
                }}   
            >
                Logout
            </Text>

        </TouchableOpacity>
    )
}


function ProfileScreen(){
    const user = useGlobal(state => state.user)
    return (
        <View
            style = {{
                flex: 1,
                alignItems: 'center',
                paddingTop: 100
            }}
        >

            <Image 
                source={require('../assets/profile.png')} 
                style = {{width: 180, height: 180, borderRadius: 90, backgroundColor: '#e0e0e0', marginBottom: 20}}>
            </Image>

            <Text
            style={{
                textAlign: 'center',
                color: '#303030',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 3
            }}
            > 
            {user.name}
            </Text>

            <Text
                style={{
                    textAlign: 'center',
                    color: '#606060',
                    fontSize: 14
                }}
            >
                @{user.username}
            </Text>

            <ProfileLogout />
        </View>
    )
}

export default ProfileScreen