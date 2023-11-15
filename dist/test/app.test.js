"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const db_1 = require("../db");
const app_1 = __importDefault(require("../app"));
let server;
let testToken;
let userId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.AppDataSource.initialize();
    server = app_1.default.listen(4000);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (server) {
            yield server.close();
            console.log('Server closed');
        }
        yield db_1.AppDataSource.destroy();
    }
    catch (error) {
        console.error('Error closing server and destroying database connection:', error);
        throw error;
    }
}));
describe('test API', () => {
    test('test app healthy', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .get('/api/healthy');
        expect(status).toBe(200);
    }));
});
describe('test AUTH', () => {
    test('test user register', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .post('/user/register')
            .send({
            username: "user",
            email: "user@user.com",
            password: "12345"
        })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(status).toBe(200);
        expect(body.success).toBe(true);
        console.log('-----------------------------------');
        console.log(body.data.id);
        console.log('-----------------------------------');
        userId = body.data.id;
    }));
    test('test user register duplicated email', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .post('/user/register')
            .send({
            email: "user@user.com",
            password: "12345"
        })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(status).toBe(500);
        expect(body.success).toBe(false);
        // global.myUrlShorterResponse = body.urlShorted
    }));
    test('test login user', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .post('/user/login')
            .send({
            email: "user@user.com",
            password: "12345"
        })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(status).toBe(200);
        expect(body.success).toBe(true);
        expect(typeof body.token).toEqual('string');
        testToken = body.token;
    }));
    test('test profile endpoint with authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Assuming you have a user with the testToken generated from the login test
        const response = yield (0, supertest_1.default)(server)
            .get('/user/profile')
            .set('Authorization', `Bearer ${testToken}`) // Use the testToken as a bearer token
            .set('Accept', 'application/json');
        // Destructure properties from the response body
        const { status, body } = response;
        // Assertions
        expect(status).toBe(200);
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined(); // Assuming the data property exists in your response
    }));
    test('test delete user', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, supertest_1.default)(server)
            .delete(`/user/remove/${userId}`)
            .set('Authorization', `Bearer ${testToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(status).toBe(200);
        expect(body.success).toBe(true);
        testToken = body.token;
    }));
});
