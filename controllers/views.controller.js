const NewsService = require('../services/news.service')
const {Files, Developers} = require('../models/models')
const fs = require('fs');
// const FileDto = require('../dtos/fileDto')
const config = require('config')
const PATH = require('path')
// const path = require("path");
// const DevelopersService = require("../services/developers.service");

// const delFileGalary = async (image) => {
//     try {
//
//
//     } catch (e) {
//         console.log(e)
//     }
// }

class NewsController {
    async getNews(req, res, next) {
        try {
            const news = await NewsService.getNews()
            return res.status(200).json(news)
        } catch (e) {
            next(e)
        }
    }

    async createPost(req, res, next) {
        try {
            const post = req.body
            const news = await NewsService.createPost(post)
            return res.status(200).json(news)
        } catch (e) {
            next(e)
        }
    }
    async plusAUP(req, res, next) {
        try {
            const plus = req.body
            const man = await NewsService.plusAUP(plus)
            return res.status(200).json(man)
        } catch (e) {
            next(e)
        }
    }
    async updateManAUP(req, res, next) {
        try {

            const plus = req.body
            console.log(plus)
            const man = await NewsService.updateManAUP(plus)
            return res.status(200).json(man)
        } catch (e) {
            next(e)
        }
    }
    async getAUP(req, res, next) {
        try {
            const mans = await NewsService.getAUP()
            return res.status(200).json(mans)
        } catch (e) {
            next(e)
        }
    }
    async delMan(req, res, next) {
        try {
            const man = req.body
            const del = await NewsService.delMan(man)
            return res.status(200).json(del)
        } catch (e) {
            next(e)
        }
    }
    async plusVideo(req, res, next) {
        try {
            const video = req.body
            console.log(video)
            const itog = await NewsService.plusVideo(video)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async plusComVak(req, res, next) {
        try {
            const com = req.body
            const itog = await NewsService.plusComVak(com)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async editOpenVak(req, res, next) {
        try {
            const vak = req.body
            const itog = await NewsService.editOpenVak(vak)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async getComVak(req, res, next) {
        try {
            const com = req.body
            const coms = await NewsService.getComVak(com)
            return res.status(200).json(coms)
        } catch (e) {
            next(e)
        }
    }
    async delComVak(req, res, next) {
        try {
            const com = req.body
            const itog = await NewsService.delComVak(com)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async createVak(req, res, next) {
        try {
            const vak = req.body
            const itog = await NewsService.createVak(vak)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async getVakansii(req, res, next) {
        try {
            const vaks = await NewsService.getVakansii()
            return res.status(200).json(vaks)
        } catch (e) {
            next(e)
        }
    }
    async editVak(req, res, next) {
        try {

            const vak = req.body

            console.log(vak)
            const itog = await NewsService.editVak(vak)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async delTisVak(req, res, next) {
        try {

            const vak = req.body

            console.log(vak)
            const itog = await NewsService.delTisVak(vak)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async getAbout(req, res, next) {
        try {
            const com = req.body
            const itog = await NewsService.getAbout(com)
            console.log('контроллер')
            console.log(itog)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async saveAbout(req, res, next) {
        try {
            const about = req.body
            const itog = await NewsService.saveAbout(about)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async plusCompany(req, res, next) {
        try {
            const com = req.body
            const itog = await NewsService.plusCompany(com)
            return res.status(200).json(itog)
        } catch (e) {
            next(e)
        }
    }
    async getGroupCompanyes(req, res, next) {
        try {
            const coms = await NewsService.getGroupCompanyes()
            return res.status(200).json(coms)
        } catch (e) {
            next(e)
        }
    }
    async delComGroup(req, res, next) {
        try {
            const com = req.body
            const del = await NewsService.delComGroup(com)
            return res.status(200).json(del)
        } catch (e) {
            next(e)
        }
    }
    async editСomGroup(req, res, next) {
        try {
            const com = req.body
            const edit = await NewsService.editСomGroup(com)
            return res.status(200).json(edit)
        } catch (e) {
            next(e)
        }
    }
    async updatePosComGroup(req, res, next) {
        try {
            const com = req.body
            const edit = await NewsService.updatePosComGroup(com)
            return res.status(200).json(edit)
        } catch (e) {
            next(e)
        }
    }
    async getPlaces(req, res, next) {
        try {
            const act = req.body
            const places = await NewsService.getPlaces(act)
            return res.status(200).json(places)
        } catch (e) {
            next(e)
        }
    }
    async plusPlaces(req, res, next) {
        try {
            const place = req.body
            const plus = await NewsService.plusPlaces(place)
            return res.status(200).json(plus)
        } catch (e) {
            next(e)
        }
    }
    async delPlace(req, res, next) {
        try {
            const id = req.body
            const del = await NewsService.delPlace(id)
            return res.status(200).json(del)
        } catch (e) {
            next(e)
        }
    }
    async createpack(req, res, next) {
        try {
            const pack = req.body
            const newpack = await NewsService.createpack(pack)
            return res.status(200).json(newpack)
        } catch (e) {
            next(e)
        }
    }
    async getAllPacks(req, res, next) {
        try {
            const capter = req.body
            const list = await NewsService.getAllPacks(capter)
            return res.status(200).json(list)
        } catch (e) {
            next(e)
        }
    }
    async editPrioryPack(req, res, next) {
        try {
            const priory = req.body
            const itogy = await NewsService.editPrioryPack(priory)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async updatePack(req, res, next) {
        try {
            const pack = req.body
            const itogy = await NewsService.updatePack(pack)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async createImgGallery(req, res, next) {
        try {
            const img = req.body
            const itogy = await NewsService.createImgGallery(img)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getGalleryImgs(req, res, next) {
        try {
            const capter = req.body
            const itogy = await NewsService.getGalleryImgs(capter)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }

    async deleteImgGalary(req, res, next) {
        try {
            const image = req.body;
            const itogy = await NewsService.deleteImgGalary(image);

            if (itogy) {
                const path = PATH.join(config.get('public_path'), 'gallery', 'company', `${image.name.split('/')[3]}`);
                console.log(path);

                fs.unlink(path, (err) => {
                    if (err) {
                        // return res.status(500).json({ message: `Ошибка при удалении файла: ${err}` });
                    }
                    // Здесь мы отправляем ответ, когда файл успешно удален, включая itogy
                    return res.status(200).json({ message: 'Файл удален', itogy }); // Возможно, нужно вернуть itogy
                });
            } else {
                return res.status(404).json({ message: 'Нет файла для удаления или он не найден' }); // Если itogy не истинно
            }
        } catch (e) {
            next(e);
        }
    }
    async getCities(req, res, next) {
        try {
            const capter = req.body
            const itogy = await NewsService.getCities(capter)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async createCity(req, res, next) {
        try {
            const contact = req.body
            const itogy = await NewsService.createCity(contact)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async uploadStaticContact(req, res, next) {
        try {
            const contact = req.body
            const itogy = await NewsService.uploadStaticContact(contact)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async plusContactParam(req, res, next) {
        try {
            const contact = req.body
            const itogy = await NewsService.plusContactParam(contact)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async createZone(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.createZone(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getZones(req, res, next) {
        try {
            const capter = req.body
            const itogy = await NewsService.getZones(capter)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async updateZone(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.updateZone(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async plusZoneSlider(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.plusZoneSlider(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getZonesSlides(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.getZonesSlides(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async editPrioryZoneSlider(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.editprioryzoneslider(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delZoneSlider(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.delZoneSlider(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getProgramsSlides(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.getProgramsSlides(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async plusProgramSlider(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.plusProgramSlider(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delProgramSlider(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.delProgramSlider(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getProgramsPage(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.getProgramsPage(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async plusProgramPage(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.plusProgramPage(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delProgramPage(req, res, next) {
        try {
            const zone = req.body
            const itogy = await NewsService.delProgramPage(zone)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async plusTrenersGroup(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.plusTrenersGroup(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getTrenersGroup(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.getTrenersGroup(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delTrenersGroup(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.delTrenersGroup(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async plusTrenerMan(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.plusTrenerMan(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getTrenersMan(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.getTrenersMan(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delTrenerMan(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.delTrenerMan(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delPacks(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.delPacks(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getMobileURLs(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.getMobileURLs(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async updateURLMobileAPP(req, res, next) {
        try {
            const group = req.body
            const itogy = await NewsService.updateURLMobileAPP(group)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getAllPticesAvia(req, res, next) {
        try {
            const capter = req.body
            const itogy = await NewsService.getAllPticesAvia(capter)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getProgramsAvia(req, res, next) {
        try {
            const capter = req.body
            const itogy = await NewsService.getProgramsAvia(capter)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async createPriceAvia(req, res, next) {
        try {
            const program = req.body
            const itogy = await NewsService.createPriceAvia(program)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async editPriceAvia(req, res, next) {
        try {
            const program = req.body
            const itogy = await NewsService.editPriceAvia(program)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delPrice(req, res, next) {
        try {
            const program = req.body
            const itogy = await NewsService.delPrice(program)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delNewsPost(req, res, next) {
        try {
            const news = req.body
            const itogy = await NewsService.delNewsPost(news)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async updatePost(req, res, next) {
        try {
            const news = req.body
            const itogy = await NewsService.updatePost(news)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async reversePrioryAUP(req, res, next) {
        try {
            const aup = req.body
            const itogy = await NewsService.reversePrioryAUP(aup)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async editPrioryPrice(req, res, next) {
        try {
            const priory = req.body
            const itogy = await NewsService.editPrioryPrice(priory)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async createTeacherAvia(req, res, next) {
        try {
            const teacher = req.body
            const itogy = await NewsService.createTeacherAvia(teacher)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getTeachersAvia(req, res, next) {
        try {
            const capter = req.body
            const itogy = await NewsService.getTeachersAvia(capter)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async prioryTeachersAvia(req, res, next) {
        try {
            const teacher = req.body
            const itogy = await NewsService.prioryTeachersAvia(teacher)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async editTeacherAvia(req, res, next) {
        try {
            const teacher = req.body
            const itogy = await NewsService.editTeacherAvia(teacher)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async delTeacherAvia(req, res, next) {
        try {
            const teacher = req.body
            const itogy = await NewsService.delTeacherAvia(teacher)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async getLearnTeory(req, res, next) {
        try {
            const capter = req.body
            const itogy = await NewsService.getLearnTeory(capter)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async editTheoryDesc(req, res, next) {
        try {
            const desc = req.body
            const itogy = await NewsService.editTheoryDesc(desc)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async createListLeart(req, res, next) {
        try {
            const learn = req.body
            const itogy = await NewsService.createListLeart(learn)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }
    async createListTheory(req, res, next) {
        try {
            const learn = req.body
            const itogy = await NewsService.createListTheory(learn)
            return res.status(200).json(itogy)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new NewsController()