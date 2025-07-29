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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptUsage = void 0;
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let PromptUsage = class PromptUsage {
    id;
    date;
    created_at;
    comptage_prompt;
    user;
};
exports.PromptUsage = PromptUsage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PromptUsage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], PromptUsage.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], PromptUsage.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PromptUsage.prototype, "comptage_prompt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.prompt_usage, { onDelete: "CASCADE" }),
    __metadata("design:type", user_entity_1.User)
], PromptUsage.prototype, "user", void 0);
exports.PromptUsage = PromptUsage = __decorate([
    (0, typeorm_1.Entity)()
], PromptUsage);
//# sourceMappingURL=prompt_usage.entity.js.map