import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import {ProductService} from './product.service'
import {AddProductDto} from './dto/product.dto'

@Controller('api/product')
export class ProductController {
	constructor(private productService: ProductService){}

	@Get()
	getAll(){
		return this.productService.findAll()
	}

	@Post()
	addOne(@Body() addProductDto: AddProductDto){
		return this.productService.addOne(addProductDto.name)
	}

	@Delete(':id')
	deleteOne(@Param('id') id: string){
		return this.productService.deleteOne(id)
	}
}
