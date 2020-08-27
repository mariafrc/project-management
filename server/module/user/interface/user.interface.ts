import {Document} from 'mongoose'

export interface User extends Document{
	_id: string
	username: string
	password: string
	role: string
}
