import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { UserDocument, UserModel } from '../model';
import userRepository from '../repository';
import { userData } from './__mock__/mock';

jest.mock('mongoose', () => {
  const mongoose = jest.requireActual('mongoose');
  return new mongoose.Mongoose(); // new mongoose instance and connection for each test
});

describe('user.repository', () => {
  let mongod: MongoMemoryServer;
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoDbUri = await mongod.getUri();
    await mongoose.connect(mongoDbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  });

  afterEach(async () => {
    expect.hasAssertions();
    jest.clearAllMocks();
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongod.stop();
    await mongoose.connection.close();
  });

  describe('create', () => {
    it('should create a new resource', async () => {
      const newUser = await userRepository.create(userData);

      expect(newUser).toBeDefined();
    });
  });

  describe('getById', () => {
    it('should get the first resource with conditions', async () => {
      const newUser = await UserModel.create(userData);
      const response = await userRepository.getById(newUser._id);
      expect(response).toBeDefined();
    });
  });

  describe('get', () => {
    it('should get the resource with conditions', async () => {
      await UserModel.create(userData);
      const response = await userRepository.get();
      expect(response[0]).toBeDefined();
    });
  });

  describe('findOneAndUpdate', () => {
    it('should update resource', async () => {
      const res = await UserModel.create(userData);

      const updated = await userRepository.findOneAndUpdate(res._id, {
        fb: 'fb'
      });
      expect(updated).toBeDefined();
      expect((updated as UserDocument).fb).toEqual('fb');
    });
  });
});
