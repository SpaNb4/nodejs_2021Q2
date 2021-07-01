"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("@nestjs/common");
const user_entity_1 = __importDefault(require("./../entities/user.entity"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PgUsersStorage = class PgUsersStorage {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.findAll = async () => this.usersRepository.find();
        this.findOne = async (id) => {
            const user = await this.usersRepository.findOne(id);
            if (!user) {
                throw Object.assign(new Error('User not found'), { status: 404 });
            }
            return user;
        };
        this.create = async (userData) => {
            const findUser = await this.usersRepository.findOne({ login: userData.login });
            if (findUser) {
                throw Object.assign(new Error('User already exists'), { status: 409 });
            }
            if (userData.password) {
                const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
                const user = new user_entity_1.default({ ...userData, password: hashedPassword });
                await user.save();
                return user;
            }
            const user = new user_entity_1.default(userData);
            await user.save();
            return user;
        };
        this.update = async (id, newUserData) => {
            const user = await this.findOne(id);
            if (!user) {
                throw Object.assign(new Error('User not found'), { status: 404 });
            }
            await this.usersRepository.update(id, newUserData);
            return user;
        };
        this.remove = async (id) => {
            const removedUser = await this.findOne(id);
            if (!removedUser) {
                throw Object.assign(new Error('User not found'), { status: 404 });
            }
            return this.usersRepository.remove(removedUser);
        };
    }
};
PgUsersStorage = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PgUsersStorage);
exports.default = PgUsersStorage;
