import { UseGuards } from '@nestjs/common';
import { StaticService } from './static.service';
import { StaticResDto } from './dto/static-res.dto';
import { StaticReqDto } from './dto/static-req.dto';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth/firebase-auth-guard';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => [StaticResDto])
@UseGuards(FirebaseAuthGuard)
export class StaticResolver {
  constructor(private readonly staticService: StaticService) {}

  @Query(() => [StaticResDto], { name: 'getCatBreeds' })
  public getCatBreeds(): Promise<StaticResDto[]> {
    return this.staticService.getCatBreeds();
  }

  @Query(() => [StaticResDto], { name: 'getDogBreeds' })
  public getDogBreeds(): Promise<StaticResDto[]> {
    return this.staticService.getDogBreeds();
  }

  @Query(() => [StaticResDto], { name: 'getCatFacts' })
  public getCatFacts(): Promise<StaticResDto[]> {
    return this.staticService.getCatFacts();
  }

  @Query(() => [StaticResDto], { name: 'getDogFacts' })
  public getDogFacts(): Promise<StaticResDto[]> {
    return this.staticService.getDogFacts();
  }

  @Query(() => [StaticResDto], { name: 'getBreedsBySpecies' })
  public getBreedsBySpecies(
    @Args('data') { species }: StaticReqDto,
  ): Promise<StaticResDto[]> {
    return this.staticService.getBreedsBySpecies(species);
  }

  @Query(() => [StaticResDto], { name: 'getFactsBySpecies' })
  public getFactsBySpecies(
    @Args('data') { species }: StaticReqDto,
  ): Promise<StaticResDto[]> {
    return this.staticService.getFactsBySpecies(species);
  }
}
