import { Controller, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AddUserDto, ChangeNameDto, ChangePasswordDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userService: UserService){}
    
    @Post()
    addUser(@Body() addUserDto: AddUserDto){
        return this.userService.createUser(addUserDto);
    }

    @Patch(':id/change-name')
    changeName(@Param('id', ParseIntPipe) id: number, @Body() changeNameDto: ChangeNameDto){
        return this.userService.changeName(id, changeNameDto.username);
    }

    @Patch(':id/change-password')
    async changePassword(@Param('id', ParseIntPipe) id: number, @Body() changePasswordDto: ChangePasswordDto){
        if(!this.userService.isValid(id, changePasswordDto.lastPassword)){
            throw new BadRequestException("Password error");
        }
        return this.userService.changePassword(id, changePasswordDto.newPassword);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id);
    }

    @Get(':id/projects')
    getProjects(@Param('id', ParseIntPipe) id: number){
        return this.userService.findProjects(id);
    }

    @Get(':id/projects/:projectId')
    getOneProject(@Param('id', ParseIntPipe) id: number, @Param('projectId', ParseIntPipe) projectId: number){
        return this.userService.findOneProject(id, projectId);
    }
}
