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
exports.startServer = void 0;
const expressApp_1 = __importDefault(require("./expressApp"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 3000;
    expressApp_1.default.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    process.on("uncaughtException", (e) => {
        console.log(e);
        process.exit(1);
    });
});
exports.startServer = startServer;
(0, exports.startServer)().then(() => {
    console.log('Server started');
});
