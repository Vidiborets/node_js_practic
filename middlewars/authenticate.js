const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
//Проверка токена на валидность
//1.Извлечь из заголовка authorization содержимое
//2.Разделить полученую строку на 2 слова
//3.Если первое слово не равно "Bearer" - вернуть ответ с 401
//4.Если первое слово равно "Bearer", проверить втрое слово токен
// на валидность с помощью метод jwt.verify и SECRET_KEY
//5.Если токен не прошел проверку на валидность , вернуть 401 ответ

//Нам нужно определить кому принадлежит токен:
//1.Ищем в базе пользователя с id  который был закодирован в токене
//2.Если пользователя с таким id в базе нет , возвращаем 401 ответ
//3.Если есть - прикрепляем е обьекту req пользователя и передает
//обработку дальше req.user = user

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new createError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new createError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = authenticate;
