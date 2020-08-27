import { Injectable } from '@nestjs/common';
import {Product} from './interface/product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

	findAll(): Promise<Product[]>{
		return this.productModel.find().exec()
	}

	addOne(name: string): Promise<Product>{
		const product = new this.productModel({name})
		return product.save()
	}

	deleteOne(id: string): Promise<Product>{
		return this.productModel.findOneAndDelete({_id: id}).exec()
	}
}
