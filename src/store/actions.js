import axios from 'axios'

export default{
    increment (context) {
        context.commit('increment')
    },
    generateToken(context){
        let config = {
            auth: {
                username: 'VIdEy4_1cIBGvQ6IoSMAm3NN',
                password: '4B3RhSOBvGZ6pagHDuigpytoxhxln-ye'
              }
        }
        axios
            .post("https://auth.sphere.io/oauth/myplayground-68/anonymous/token?grant_type=client_credentials&scope=create_anonymous_token:myplayground-68", null,config)
            .then(response => context.commit('setToken', response.data.access_token))
    }
}