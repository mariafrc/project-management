import {Document} from 'mongoose'

export interface Product extends Document{
	_id: string
	name: string
}