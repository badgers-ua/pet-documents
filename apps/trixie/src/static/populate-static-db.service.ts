import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CatBreed, CatBreedDocument } from './schemas/cat-breed.schema';
import { Model } from 'mongoose';
import { DogBreed, DogBreedDocument } from './schemas/dog-breed.schema';
import { CatFact, CatFactDocument } from './schemas/cat-fact.schema';
import { DogFact, DogFactDocument } from './schemas/dog-facts.schema';
import * as catBreeds from '../assets/cat-breeds.json';
import * as dogBreeds from '../assets/dog-breeds.json';
import * as catFacts from '../assets/cat-facts.json';
import * as dogFacts from '../assets/dog-facts.json';

@Injectable()
export class PopulateStaticDbService {
  constructor(
    @InjectModel(CatBreed.name)
    private readonly catBreedModel: Model<CatBreedDocument>,
    @InjectModel(DogBreed.name)
    private readonly dogBreedModel: Model<DogBreedDocument>,
    @InjectModel(CatFact.name)
    private readonly catFactModel: Model<CatFactDocument>,
    @InjectModel(DogFact.name)
    private readonly dogFactModel: Model<DogFactDocument>
  ) {
    this.populateDb();
  }

  private async populateDb(): Promise<void> {
    const _catBreeds = catBreeds.map((b) => ({ name: b }));
    const _dogBreeds = dogBreeds.map((b) => ({ name: b }));
    const _catFacts = catFacts.map(({ fact }) => ({ name: fact }));
    const _dogFacts = dogFacts.map(({ fact }) => ({ name: fact }));

    try {
      const isCatBreedModelEmpty = !(await this.catBreedModel.find().exec())
        ?.length;
      if (isCatBreedModelEmpty) {
        await this.catBreedModel.insertMany(_catBreeds);
      }

      const isDogBreedModelEmpty = !(await this.dogBreedModel.find().exec())
        ?.length;
      if (isDogBreedModelEmpty) {
        await this.dogBreedModel.insertMany(_dogBreeds);
      }

      const isCatFactModelEmpty = !(await this.catFactModel.find().exec())
        ?.length;
      if (isCatFactModelEmpty) {
        await this.catFactModel.insertMany(_catFacts);
      }

      const isDogFactModelEmpty = !(await this.dogFactModel.find().exec())
        ?.length;
      if (isDogFactModelEmpty) {
        await this.dogFactModel.insertMany(_dogFacts);
      }
    } catch (e) {
      console.log(`[ERROR POPULATING STATIC DB]: ${e}`);
    }
  }
}
