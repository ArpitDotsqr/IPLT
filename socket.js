import { io } from 'socket.io-client'

// const URL = 'https://localhost:3050'

 const URL = "https://ipltapp.24livehost.com:3050"

export const socket = io(URL)