"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./db/data-source");
const RoutesUser_1 = __importDefault(require("./routes/RoutesUser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'localhost:3000'
}));
app.use(express_1.default.static('public'));
// Routes
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/entrar.html"));
});
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.use('/api', RoutesUser_1.default);
    app.listen(3000, () => console.log('Server rodando na porta 3000'));
})
    .catch((error) => console.log(error));
