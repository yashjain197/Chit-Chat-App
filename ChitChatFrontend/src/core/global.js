import { create } from 'zustand'
import secure from './secure'
import api from './api'
import { SIGNIN } from '../utils/endpoint'
import utils from './utils'

const useGlobal = create((set) => ({

    //---------------------
    //   Initialization
    //---------------------

    initialized: false,

    init: async() => {
        const credentials = await secure.get('credentials')
        console.log("cred: ", credentials)
        if (credentials) {
            try {
                const response = await api({
                    method: 'POST',
                    url: SIGNIN,
                    data : {
                        username: credentials.username,
                        password: credentials.password
                    }
                })
                
                if(response.status !== 200){
                    throw 'Authentication error'
                }

                const user = response.data.user

                set((state)=>({
                    initialized: true,
                    authenticated: true,
                    user: user
                }))

                return
                
            } catch (error) {
                console.log('useGlobal init: ', error)
            }        
        }

        set((state)=>({
            initialized: true,
        }))
    },

    //---------------------
    //   Authentication
    //---------------------
    authenticated: false,
    user: {},

    login: (credentials, user) => {
        secure.set('credentials', credentials)
        set((state)=>({
            authenticated: true,
            user: user
        }))
    },

    logout: () => {
        secure.wipe()
        set((state) => ({
            authenticated: false,
            user: {}
        }))
    },

    //---------------------
    //   Websocket
    //---------------------
    socket: null,
    socketConnect: async () => {
        const tokens = await secure.get('tokens')
        utils.log('TOKENS ', tokens)
    },
    
    socketClose: () => {
        
    }

}))

export default useGlobal