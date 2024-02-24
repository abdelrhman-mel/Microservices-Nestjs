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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const dto_1 = require("./dto");
const users_entity_1 = require("./users.entity");
const decorator_1 = require("./decorator");
const guard_1 = require("./guard");
const productDto_1 = require("./productDto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    signup(dto) {
        return this.usersService.signup(dto);
    }
    signIn(dto) {
        return this.usersService.signin(dto);
    }
    editUser(userId, dto) {
        return this.usersService.editUser(userId, dto);
    }
    getMe(user) {
        delete user.hash;
        return user;
    }
    getAllUsers(ifAdmin) {
        if (ifAdmin) {
            return this.usersService.getAllUsers();
        }
    }
    editAdmins(ifAdmin, userId, isAdmin) {
        if (ifAdmin) {
            return this.usersService.editAdmins(userId, isAdmin);
        }
    }
    createProduct(dto, userId) {
        return this.usersService.createProduct(dto, userId);
    }
    getMyProducts(userId) {
        return this.usersService.getMyProducts(userId);
    }
    getAllProducts(page = 1, limit = 10, sort, name) {
        return this.usersService.getAllProducts(page, limit, sort, name);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signup", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.EditUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "editUser", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.IsAdmin)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)('/editAdmin/:id'),
    __param(0, (0, decorator_1.IsAdmin)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('isAdmin', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Number, Boolean]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "editAdmins", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('/products'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productDto_1.AddProductDto, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)('/myproducts'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyProducts", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)('/products'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('sort')),
    __param(3, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllProducts", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map