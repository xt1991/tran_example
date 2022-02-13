import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { PostDocument, PostModel } from '../model';
import postRepository from '../repository';
import { postData } from './__mock__/mock';

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
    await PostModel.deleteMany({});
  });

  afterAll(async () => {
    await mongod.stop();
    await mongoose.connection.close();
  });

  describe('create', () => {
    it('should create a new resource', async () => {
      const newPost = await postRepository.create(postData);

      expect(newPost).toBeDefined();
    });
  });

  describe('getById', () => {
    it('should get the first resource with conditions', async () => {
      const newPost = await PostModel.create(postData);
      const response = await postRepository.getById(newPost._id);
      expect(response).toBeDefined();
    });
  });

  describe('get', () => {
    it('should get the resource with conditions', async () => {
      await PostModel.create(postData);
      const response = await postRepository.get();
      expect(response[0]).toBeDefined();
    });
  });

  describe('findOneAndUpdate', () => {
    it('should update resource', async () => {
      const res = await PostModel.create(postData);

      const updated = await postRepository.findOneAndUpdate(res._id, {
        content: 'content'
      });
      expect(updated).toBeDefined();
      expect((updated as PostDocument).content).toEqual('content');
    });
  });
});
