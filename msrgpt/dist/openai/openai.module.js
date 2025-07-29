"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpeniaModule = void 0;
const common_1 = require("@nestjs/common");
const openai_service_1 = require("./openai.service");
const openai_controller_1 = require("./openai.controller");
const openai_1 = require("openai");
const typeorm_1 = require("@nestjs/typeorm");
const prompt_entity_1 = require("../prompts/prompt.entity");
const user_entity_1 = require("../users/user.entity");
const prompt_usage_entity_1 = require("../prompts/prompt_usage.entity");
let OpeniaModule = class OpeniaModule {
};
exports.OpeniaModule = OpeniaModule;
exports.OpeniaModule = OpeniaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([prompt_entity_1.Prompt, user_entity_1.User, prompt_usage_entity_1.PromptUsage]),
        ],
        providers: [openai_service_1.OpenaiService, openai_1.default],
        controllers: [openai_controller_1.OpeniaController]
    })
], OpeniaModule);
//# sourceMappingURL=openai.module.js.map