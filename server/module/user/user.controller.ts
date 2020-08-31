import { 
    Controller, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete,
    ParseIntPipe, 
    BadRequestException, 
    Get, 
    UseInterceptors, 
    ClassSerializerInterceptor, 
    UseGuards, 
    Req
} from '@nestjs/common';
import { AddUserDto, ChangeNameDto, ChangePasswordDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '~guard/jwt-auth.guard';

@Controller('api/users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userService: UserService){}
    
    @Post()
    addUser(@Body() addUserDto: AddUserDto){
        return this.userService.createUser(addUserDto);
    }

    @Patch(':id/change-name')
    changeName(@Req() req: any, @Body() changeNameDto: ChangeNameDto){
        return this.userService.changeName(req.user.id, changeNameDto.username);
    }

    @Patch(':id/change-password')
    async changePassword(@Req() req: any, @Body() changePasswordDto: ChangePasswordDto){
        if(!this.userService.isValid(req.user.id, changePasswordDto.lastPassword)){
            throw new BadRequestException("Password error");
        }
        return this.userService.changePassword(req.user.id, changePasswordDto.newPassword);
    }

    @Delete(':id')
    deleteUser(@Req() req: any){
        return this.userService.deleteUser(req.user.id);
    }

    @Get(':id/projects')
    getProjects(@Req() req: any){
        return this.userService.findProjects(req.user.id);
    }

    @Get(':id/projects/:projectId')
    getOneProject(@Req() req: any, @Param('projectId', ParseIntPipe) projectId: number){
        return this.userService.findOneProject(req.user.id, projectId);
    }
}
