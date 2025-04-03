const express = require('express');
const config = require('config');
const cors = require('cors');
const sequelize = require('./db');
const app = express();
const PORT = config.get('serverPort');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // Для загрузки файлов
const path = require("path");
const fs = require("fs");
const http = require('http');
const { Server } = require('socket.io'); // Для работы с WebSockets

const router = require('./routes/index');
const errorMiddlewere = require('./middlewere/error.middlewere');

// Создаем сервер с использованием http для работы с сокетами
const server = http.createServer(app);
const io = new Server(server); // Инициализация Socket.IO

// Определяем базовую директорию для сохранения видео
const baseVideoDir = path.join(__dirname, 'client', 'public', 'videos');

// Функция для очистки папки
const clearVideoFolder = (directory) => {
    fs.readdir(directory, (err, files) => {
        if (err) console.error('Ошибка при чтении папки:', err);
        else {
            for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                    if (err) console.error('Ошибка при удалении файла:', err);
                });
            }
        }
    });
};

// Настраиваем хранилище для видео
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const company = req.params.company; // Получаем переменную company из параметров маршрута
        const companyDir = path.join(baseVideoDir, company); // Определяем путь к папке компании

        // Проверяем, существует ли папка компании
        if (!fs.existsSync(companyDir)) {
            return cb(new Error('Папка для компании не существует.'));
        }

        // Очищаем папку перед загрузкой
        clearVideoFolder(companyDir);

        cb(null, companyDir); // Папка для сохранения видео
    },
    filename: (req, file, cb) => {
        cb(null, 'video.mp4'); // Сохраняем видео с фиксированным именем
    }
});

// Настраиваем `multer` для загрузки видео с ограничением размера
const uploadVideo = multer({
    storage: videoStorage,
    limits: { fileSize: 100 * 1024 * 1024 } // Ограничение размера файла (например, 100 MB)
});

// Маршрут для загрузки видео
app.post('/api/uploadVideo/:company', uploadVideo.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No video uploaded' });
    }

    const videoPath = `/videos/${req.params.company}/video.mp4`; // Возвращаем полный путь к файлу
    res.json({ videoPath });
});

// Настраиваем хранилище для загрузки изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'client', 'public', 'images', 'company')); // Папка для сохранения
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname); // Получаем расширение файла
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Генерируем уникальное имя файла с расширением
    }
});
// Настраиваем хранилище для загрузки изображений
const gallerybox = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'client', 'public', 'gallery', 'company')); // Папка для сохранения
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname); // Получаем расширение файла
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Генерируем уникальное имя файла с расширением
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Ограничение размера файла (5 MB)
});

const gallery = multer({
    storage: gallerybox,
    limits: { fileSize: 5 * 1024 * 1024 } // Ограничение размера файла (5 MB)
});

app.use(cors({
    origin: config.get('client_url'),
    credentials: true
}));
app.use('/files', express.static(config.get('file_path')));
app.use(cookieParser());
app.use(express.json({ extended: true, limit: '3mb' }));
app.use(express.urlencoded({ extended: true, limit: '3mb' }));
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Маршрут для загрузки изображений
app.post('/api/upload', upload.single('image'), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/images/company/${req.file.filename}`; // Возвращаем полный путь к файлу с расширением
    res.json({ filePath });
});

// Маршрут для загрузки изображений в галерею
app.post('/api/gallery', gallery.single('image'), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/gallery/company/${req.file.filename}`; // Возвращаем полный путь к файлу с расширением
    res.json({ filePath });
});
app.delete('/api/delete', (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ message: 'File path is required' });
    }

    const fullPath = path.join(__dirname, 'client', 'public', filePath);

    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Ошибка при удалении файла:', err);
            return res.status(500).json({ message: 'Ошибка при удалении файла' });
        }

        res.json({ message: 'Файл успешно удален' });
    });
});
app.delete('/api/deleteCrop', (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ message: 'File path is required' });
    }

    const fullPath = path.join(__dirname, 'client', 'public', 'images', 'company', filePath);

    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Ошибка при удалении файла:', err);
            return res.status(500).json({ message: 'Ошибка при удалении файла' });
        }

        res.json({ message: 'Файл успешно удален' });
    });
});
// Пример работы с WebSockets
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log('Message received: ', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Обработка ошибок
app.use(errorMiddlewere); // Обязательно последний!



const start = async () => {
    try {
        server.listen(PORT, '0.0.0.0', () => { // Используем server.listen вместо app.listen
            console.log('Server started on port:', PORT);
        });

        // await sequelize.sync({ alter: true })
        console.log('Connected to DB');
    } catch (e) {
        console.log(e);
    }
};

start();