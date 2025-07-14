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
exports.UserController = void 0;
const data_source_1 = require("../db/data-source");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
class UserController {
    // Listar todos os usuários
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userRepository.find();
            res.json(users);
            return;
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userRepository.findOneBy({ email });
            if (!user) {
                res.status(404).json({ message: "Usuario não encontrado" });
                return;
            }
            const isValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValid) {
                res.status(401).json({ message: "senha invalida" });
                return;
            }
            else {
                res.status(200).json({ message: "login bem sucedido" });
                return;
            }
        });
    }
    // Criar novo usuário
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ message: "Todos os campos são necessários!" });
                return;
            }
            const user = new User_1.User(name, email, password);
            const newUser = yield userRepository.create(user);
            yield userRepository.save(newUser);
            res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
            return;
        });
    }
    // Buscar usuário por ID
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userRepository.findOneBy({ id: Number(id) });
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            res.json(user);
            return;
        });
    }
    // Atualizar usuário
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const user = yield userRepository.findOneBy({ id: Number(id) });
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            user.name = name;
            user.email = email;
            user.password = password;
            yield userRepository.save(user);
            res.json(user);
            return;
        });
    }
    // Deletar usuário
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userRepository.findOneBy({ id: Number(id) });
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            yield userRepository.remove(user);
            res.status(204).send();
            return;
        });
    }
}
exports.UserController = UserController;
