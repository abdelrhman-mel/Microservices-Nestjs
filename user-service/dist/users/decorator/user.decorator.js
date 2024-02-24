"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdmin = exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user) {
        if (data) {
            return user[data];
        }
        return user;
    }
    return null;
});
exports.IsAdmin = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user || !request.user.isAdmin) {
        throw new common_1.ForbiddenException('Access denied, admin rights required');
    }
    return true;
});
//# sourceMappingURL=user.decorator.js.map