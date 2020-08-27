import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from 'dotenv'
import { UserModule } from './module/user/user.module';
import {AuthModule} from './module/auth/auth.module'
import { ProductModule } from './module/product/product.module';
config()

@Module({
  imports: [
  	MongooseModule.forRoot(process.env.DB_CONNECTION, {
  		useFindAndModify: false, 
  		useNewUrlParser: true, 
  		useCreateIndex: true
  	}),
  	UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
