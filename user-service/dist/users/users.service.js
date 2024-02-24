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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const axios_1 = require("axios");
let UsersService = class UsersService {
    constructor(config, usersRepository, jwt) {
        this.config = config;
        this.usersRepository = usersRepository;
        this.jwt = jwt;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const userCount = await this.usersRepository.count();
            if (userCount === 0) {
                const user = await this.usersRepository.save({
                    email: dto.email,
                    hash,
                    isAdmin: true,
                });
                return this.signToken(user.id, user.email);
            }
            const user = await this.usersRepository.save({
                email: dto.email,
                hash,
            });
            return this.signToken(user.id, user.email);
        }
        catch (err) {
            if (err.code === '23505') {
                throw new common_1.ForbiddenException('Email already taken');
            }
            console.log(err);
        }
    }
    async signin(dto) {
        const user = await this.usersRepository.findOne({
            where: { email: dto.email },
        });
        if (!user)
            throw new common_1.ForbiddenException('Credentials incorrect');
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Credentials incorrect');
        return this.signToken(user.id, user.email);
    }
    async signToken(userId, email) {
        const payLoad = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payLoad, {
            expiresIn: '2h',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }
    async editUser(userId, dto) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
            });
            if (!user)
                throw new common_1.ForbiddenException('User does not exist');
            this.usersRepository.update(userId, dto);
            const updatedUser = await this.usersRepository.findOne({
                where: { id: userId },
            });
            delete updatedUser.hash;
            return updatedUser;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAllUsers() {
        try {
            const users = await this.usersRepository.find();
            return users;
        }
        catch (err) {
            console.log(err);
        }
    }
    async editAdmins(userId, isAdmin) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
            });
            if (!user)
                throw new common_1.ForbiddenException('User does not exist');
            await this.usersRepository.update(userId, {
                isAdmin,
            });
            const updatedUser = await this.usersRepository.findOne({
                where: { id: userId },
            });
            return updatedUser;
        }
        catch (err) {
            console.log(err);
        }
    }
    async createProduct(dto, userId) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
            });
            if (!user)
                throw new common_1.ForbiddenException('User does not exist');
            const res = await axios_1.default.post(`http://localhost:3000/api/products`, {
                productName: dto.productName,
                price: dto.price,
                userId: userId,
            });
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getMyProducts(userId) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
            });
            if (!user)
                throw new common_1.ForbiddenException('User does not exist');
            const res = await axios_1.default.get(`http://localhost:3000/api/products/user/${userId}`);
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAllProducts(page, limit, sort, name) {
        let url = `http://localhost:3000/api/products?page=${page}&limit=${limit}`;
        if (sort) {
            url += `&sort=${sort}`;
        }
        if (name) {
            url += `&name=${encodeURIComponent(name)}`;
        }
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching products:', error.message);
            throw new common_1.ForbiddenException('Failed to fetch products');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map