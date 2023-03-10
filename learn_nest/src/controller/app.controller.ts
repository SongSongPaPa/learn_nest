import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Res, HttpCode, Redirect } from '@nestjs/common';

import { CreateCatDto } from '../dto/create-cat.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/echo/:str')
  echoParam(@Param('str') id: string, @Res() res): string {
    let response = id + '  test';
    return res.status(200).send({ response });
  }

  @Get('/query/')
  echoQuery(
    @Query('id') id: string,
    @Query('pw') pw: string,
    @Res() res,
  ): string {
    if (id == null || pw == null) {
      let response = 'failed';
      return res.status(200).send({ response });
    }
    if (id == pw) {
      let response = `id : ${id}, pw: ${pw}`;
      return res.status(200).send({ response });
    }
    let response = 'failed';
    return res.status(200).send({ response });
  }

  @Get('/status')
  @HttpCode(201)
  status(@Res() res): string {
    return res.status(201).send('123');
  }

  @Get('/redirection')
  @Redirect('https://naver.com', 301)
  redirection(): string {
    return 'check code';
  }

  @Post()
  post(@Body() dto: CreateCatDto, @Res() res): string {
    if (dto.name === dto.breed) {
      let response = `name : ${dto.name}, breed: ${dto.breed}`;
      return res.status(200).send({ response });
    }
    let response = `not same`;
    return res.status(200).send({ response });
  }
}
