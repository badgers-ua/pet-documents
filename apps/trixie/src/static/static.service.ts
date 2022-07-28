import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatFact, CatFactDocument } from './schemas/cat-fact.schema';
import { DogFact, DogFactDocument } from './schemas/dog-facts.schema';
import { DogBreed, DogBreedDocument } from './schemas/dog-breed.schema';
import { CatBreed, CatBreedDocument } from './schemas/cat-breed.schema';
import { StaticResDto } from './dto/static-res.dto';
import { SPECIES } from '@pdoc/types';

@Injectable()
export class StaticService {
  constructor(
    @InjectModel(CatBreed.name)
    private readonly catBreedModel: Model<CatBreedDocument>,
    @InjectModel(DogBreed.name)
    private readonly dogBreedModel: Model<DogBreedDocument>,
    @InjectModel(CatFact.name)
    private readonly catFactModel: Model<CatFactDocument>,
    @InjectModel(DogFact.name)
    private readonly dogFactModel: Model<DogFactDocument>,
  ) {}

  public async getCatBreeds(): Promise<StaticResDto[]> {
    const catBreeds: CatBreedDocument[] = await this.catBreedModel
      .find()
      .exec();
    return catBreeds.map((s) => new StaticResDto(s._id, s.name));
  }

  public async getDogBreeds(): Promise<StaticResDto[]> {
    const dogBreeds: DogBreedDocument[] = await this.dogBreedModel
      .find()
      .exec();
    return dogBreeds.map((s) => new StaticResDto(s._id, s.name));
  }

  public async getCatFacts(): Promise<StaticResDto[]> {
    const catFacts: CatFactDocument[] = await this.catFactModel.find().exec();
    return catFacts.map((s) => new StaticResDto(s._id, s.name));
  }

  public async getDogFacts(): Promise<StaticResDto[]> {
    const dogFacts: DogFactDocument[] = await this.dogFactModel.find().exec();
    return dogFacts.map((s) => new StaticResDto(s._id, s.name));
  }

  public async getBreedsBySpecies(species: SPECIES): Promise<StaticResDto[]> {
    if (species === SPECIES.CAT) {
      return await this.getCatBreeds();
    }
    if (species === SPECIES.DOG) {
      return await this.getDogBreeds();
    }
  }

  public async getFactsBySpecies(species: SPECIES): Promise<StaticResDto[]> {
    if (species === SPECIES.CAT) {
      return await this.getCatFacts();
    }
    if (species === SPECIES.DOG) {
      return await this.getDogFacts();
    }
  }
}
