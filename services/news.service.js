
const config = require('config')
const {News, Developers, AUPs, VakCompanies, Vakansii, About, GroupsComs, Activities, PacksKids, GalleryImages,
    ContactsPage, ZonesPage, ZonesSlider,ProgramSlider,ProgramTrain, OurTrainers, GroupTrainers,MobileApp,PricesAvia,
    ProgramLessons,TeachersAvia,LearnTheory
} = require('../models/models')
const ApiError = require("../exceptions/api.error");
const {Sequelize} = require('sequelize')
class NewsService {
    async getNews(){
        try{
            const news = await News.findAll()
            return news
        }catch(e){
            console.log(e)
        }

    }
    async createPost(post){


        const name = post.post.name
        const desc = post.post.desc
        const text = post.post.text
        const image = post.post.image
        const publ = post.post.public
        const imagefull = post.post.imagefull
        let newsDateTime
        // if(post.post.newsDateTime.length > 0){
            newsDateTime = post.post.newsDateTime
        // } else {
        //     newsDateTime = localDateTime
        // }
        let publishDateTime = post.post.publishDateTime
        try{
            const post = await News.create({title: name, desc: desc, image: image, public: publ, text: text, imagefull, newsDateTime, publishDateTime })
            return post
        }catch(e){
            console.log(e)
        }


    }

    async updatePost(thisnews){

        const id = thisnews.id
        try{
            const news = await News.findByPk(id)
            console.log(news)
            news.title = thisnews.name
            news.desc = thisnews.desc
            news.image = thisnews.image
            news.text = thisnews.text
            news.public = thisnews.public
            if(thisnews.imagefull.length>0){
                news.imagefull = thisnews.imagefull
            }
            news.newsDateTime = thisnews.newsDateTime
            news.publishDateTime = thisnews.publishDateTime
            await news.save()
            return news
        }catch(e){
            console.log(e)
        }

        return ''

    }
    async delNewsPost(news){
        const id = news.id
        const deleted = await News.findByPk(id)
        return await deleted.destroy()
    }
    async getAUP(){
        try{
            const mans = await AUPs.findAll({
                order: [['id', 'ASC']] // сортировка по возрастанию id
            })
            return mans
        }catch(e){
            console.log(e)
        }

    }
    async reversePrioryAUP(aup){
        const id = aup.id
        const priory = aup.priory
        try{
            const thisman = await AUPs.findByPk(id)
            thisman.priory = +priory
            await thisman.save()
            return thisman
        }catch(e){
            console.log(e)
        }

    }
    async plusAUP(plus){
        const firstname = plus.post.firstname
        const secondname = plus.post.secondname
        const lastname = plus.post.lastname
        const developer = plus.post.developer
        const email = plus.post.email
        const image = plus.post.image
        try{
            const man = await AUPs.create({firstname: firstname, secondname: secondname, lastname: lastname, developers: developer, email: email, image: image })
            return man
        }catch(e){
            console.log(e)
        }
        return ''

    }
    async updateManAUP(man){
        const id = man.man.id
        try{
            const thisman = await AUPs.findByPk(id)
            thisman.image = man.man.image
            thisman.firstname = man.man.firstname
            thisman.secondname = man.man.secondname
            thisman.lastname = man.man.lastname
            thisman.developers = man.man.developers
            thisman.email = man.man.email
            await thisman.save()
            return thisman
        }catch(e){
            console.log(e)
        }

        return ''

    }
    async delMan(man){
        const idman = +man.man.id
        const deleted = await AUPs.findByPk(idman)
        return await deleted.destroy()
    }
    async plusVideo(video){
        return ''
    }
    async plusComVak(com){
        const name = com.com.name
        const category = com.com.category
        try{
            const comvak = await VakCompanies.create({name: name, category: category})
            return comvak
        }catch(e){
            console.log(e)
        }

    }
    async getComVak(com){
        const cat = com.com.com
        console.log(com)
        console.log(cat)
        try{
            const coms = await VakCompanies.findAll({where: {category: cat}})
            return coms
        }catch(e){
            console.log(e)
        }

    }
    async editOpenVak(vak){

        const id = vak.vak.id
        const open = vak.vak.open

        console.log(id)
        console.log(open)

        try{
            const thisvak = await Vakansii.findByPk(id)
            thisvak.open = open
            await thisvak.save()
            return thisvak
        }catch(e){
            console.log(e)
        }



    }
    async delComVak(com){
        const idcom = +com.com.com.id
        const deleted = await VakCompanies.findByPk(idcom)
        return await deleted.destroy()
    }
    async createVak(vak){
        const name = vak.vak.name
        const respon = vak.vak.respon
        const requierments = vak.vak.requierments
        const conditions = vak.vak.conditions
        const keyskills = vak.vak.keyskills
        const company = vak.vak.company
        const email = vak.vak.email
        try{
            const itog = await Vakansii.create({name: name, respon:respon,requierments:requierments,conditions:conditions,keyskills:keyskills,company:company,email:email})
            return itog
        }catch(e){
            console.log(e)
        }

    }
    async getVakansii(){
        try{
            const vaks = await Vakansii.findAll({
                order: [['id', 'DESC']] // Сортировка по убыванию по полю id
            })
            return vaks
        }catch(e){
            console.log(e)
        }
    }
    async editVak(vak){
        const vak_id = vak.vak.id
        const name = vak.vak.name
        const respon = vak.vak.respon
        const requierments = vak.vak.requierments
        const conditions = vak.vak.conditions
        const keyskills = vak.vak.keyskills
        const company = vak.vak.company
        const email = vak.vak.email
        try{
            const thisvak = await Vakansii.findByPk(vak_id)
            thisvak.name = name
            thisvak.respon = respon
            thisvak.requierments = requierments
            thisvak.conditions = conditions
            thisvak.keyskills = keyskills
            thisvak.company = company
            thisvak.email = email
            await thisvak.save()
            return thisvak
        }catch(e){
            console.log(e)
        }

    }
    async delTisVak(vak){
        const id = vak.id
        const deleted = await Vakansii.findByPk(id)
        return await deleted.destroy()
    }
    async getAbout(com){

        try{
            const search = await About.findOne({where: {company: com.com.company}})
            if(search){
                return search
            }else{
                const itog = await About.create({text: '', company:com.com.company})
                return itog
            }
        }catch(e){

        }
    }
    async saveAbout(about){
        try{
            const search = await About.findOne({where: {company: about.about.company}})
            search.text = about.about.text
            await search.save()
            return search
        }catch(e){

        }
    }
    async plusCompany(com){
        const name = com.com.name
        const desc = com.com.desc
        const contacts = com.com.contacts
        const site = com.com.site
        const logo = com.com.logo
        const image = com.com.img
        const number = com.com.num
        try{
            const itog = await GroupsComs.create({name,desc,contacts,site,logo,image,number:+number})
            return itog
        }catch(e){
            console.log(e)
        }
    }
    async getGroupCompanyes(){
        try{
            const coms = await GroupsComs.findAll()
            return coms
        }catch(e){
            console.log(e)
        }
    }
    async delComGroup(com){
        const id = com.com.delIDcom
        const deleted = await GroupsComs.findByPk(id)
        return await deleted.destroy()
    }
    async editСomGroup(com){
        const id = com.com.id
        const name = com.com.name
        const desc = com.com.desc
        const contacts = com.com.contacts
        const site = com.com.site
        const logo = com.com.logo
        const image = com.com.img
        const number = com.com.number
        try{
            const thiscom = await GroupsComs.findByPk(id)
            thiscom.name = name
            thiscom.desc = desc
            thiscom.contacts = contacts
            thiscom.site = site
            thiscom.logo = logo
            thiscom.image = image
            thiscom.number = +number
            await thiscom.save()
            return thiscom
        }catch(e){
            console.log(e)
        }

    }
    async updatePosComGroup(com){
        const id = com.com.id
        const number = com.com.number
        try{
            const thiscom = await GroupsComs.findByPk(id)
            thiscom.number = +number
            await thiscom.save()
            return thiscom
        }catch(e){
            console.log(e)
        }

    }
    async getPlaces(act){
        const line = act.act.act
        try{
            const places = await Activities.findAll({where: {line: line}})
            return places
        }catch(e){
            console.log(e)
        }
    }
    async plusPlaces(place){

        const name = place.place.name
        const desc = place.place.desc
        const url = place.place.url
        const line = place.place.line
        try{
            const itog = await Activities.create({name,desc,url,line})
            return itog
        }catch(e){
            console.log(e)
        }
    }
    async delPlace(idline){
        const id = idline.id
        const deleted = await Activities.findByPk(id)
        return await deleted.destroy()
    }
    async createpack(pack){
        const capter = pack.capter
        const name = pack.name
        const time = pack.time
        const desc = pack.desc
        const publicdesc = pack.publicdesc
        const price = pack.price
        const image = pack.image
        const priory = +pack.priory
        try{
            const newpack = await PacksKids.create({capter, name, time, desc, price, priory, image, publicdesc})
            return newpack
        }catch(e){
            console.log(e)
        }
    }
    async getAllPacks(com){
        const capter = com.capter
        try{
            const places = await PacksKids.findAll({
                where: { capter: capter },
                order: [['id', 'ASC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async editPrioryPack(priory){

        const id = priory.id
        const value = priory.priory
        try{
            const pack = await PacksKids.findByPk(id)
            pack.priory = +value
            await pack.save()
            return pack
        }catch(e){
            console.log(e)
        }
    }
    async updatePack(pack){

        const id = pack.id
        try{
            const itogy = await PacksKids.findByPk(id)
            itogy.capter = pack.capter
            itogy.name = pack.name
            itogy.time = pack.time
            itogy.desc = pack.desc
            itogy.publicdesc = pack.publicdesc
            itogy.price = pack.price
            itogy.image = pack.image
            itogy.priory = +pack.priory
            await itogy.save()
            return itogy
        }catch(e){
            console.log(e)
        }
    }
    async createImgGallery(img){
        const capter = img.capter
        const image = img.image
        try{
            const upimg = await GalleryImages.create({capter, image})
            return upimg
        }catch(e){
            console.log(e)
        }
    }
    async getGalleryImgs(capter){

        const com = capter.capter
        try{
            const places = await GalleryImages.findAll({
                where: { capter: com },
                order: [['id', 'ASC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async deleteImgGalary(image){
        try {
            const id = +image.id
            console.log(id)
            const deleted = await GalleryImages.findByPk(id)
            return await deleted.destroy()
        }catch(e){
            console.log(e)
        }

        // try{
        //     const places = await GalleryImages.findAll({
        //         where: { capter: com },
        //         order: [['id', 'ASC']] // сортировка по возрастанию id
        //     });
        //     return places
        // }catch(e){
        //     console.log(e)
        // }
    }
    async getCities(capter){

        const com = capter.capter
        try{
            const places = await ContactsPage.findAll({
                where: { capter: com },
                order: [['id', 'ASC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async createCity(contact){
        const capter = contact.capter
        const city = contact.city
        try{
            const search = await ContactsPage.findOne({where: {capter: capter, city: city}})
            if(search){
                return 'exists'
            }else{
                const createdcity = await ContactsPage.create({capter, city})
                return createdcity
            }
        }catch(e){
            console.log(e)
        }
    }
    async getMobileURLs(contact){
        const capter = contact.capter
        try{
            const search = await MobileApp.findOne({where: {capter: capter}})
            if(search){
                return search
            }else{
                const creater = await MobileApp.create({capter})
                return creater
            }
        }catch(e){
            console.log(e)
        }
    }
    async uploadStaticContact(contact){
        const capter = contact.capter
        const city = contact.city
        const category = contact.category
        const value = contact.value
        try{
            const search = await ContactsPage.findOne({where: {capter: capter, city: city}})
            if(search){
                if(category === 'vk')search.vk = value
                if(category === 'ok')search.ok = value
                if(category === 'instagram')search.instagram = value
                if(category === 'telegram')search.telegram = value
                if(category === 'youtube')search.youtube = value
                if(category === 'mapw')search.mapw = value
                if(category === 'maph')search.maph = value
                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
    async plusContactParam(contact){
        const capter = contact.capter
        const city = contact.city
        const category = contact.category
        const value = contact.value
        try{
            const search = await ContactsPage.findOne({where: {capter: capter, city: city}})
            if(search){
                if(category === 'phone')search.phone = value
                if(category === 'adress')search.adress = value
                if(category === 'email')search.email = value
                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
    async createZone(zone){
        const name = zone.name
        const desc = zone.desc
        const capter = zone.capter
        const priory = zone.priory
        const mainimg = zone.mainimg
        const maindesc = zone.maindesc
        const firstimg = zone.firstimg
        const firstdesc = zone.firstdesc
        const secondimg = zone.secondimg
        const seconddesc = zone.seconddesc
        const lastimg = zone.lastimg
        try{
            const created = await ZonesPage.create({
                name,
                desc,
                capter,
                priory,
                mainimg,
                maindesc,
                firstimg,
                firstdesc,
                secondimg,
                seconddesc,
                lastimg
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }

    async getZones(capter){

        const com = capter.capter
        try{
            const places = await ZonesPage.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async updateZone(zone){
        const id = zone.id
        const name = zone.name
        const desc = zone.desc
        const capter = zone.capter
        const priory = zone.priory
        const mainimg = zone.mainimg
        const maindesc = zone.maindesc
        const firstimg = zone.firstimg
        const firstdesc = zone.firstdesc
        const secondimg = zone.secondimg
        const seconddesc = zone.seconddesc
        const lastimg = zone.lastimg
        try{
            const search = await ZonesPage.findOne({where: {id: id}})
            if(search){
                search.name = name
                search.desc = desc
                search.capter = capter
                search.priory = priory
                search.mainimg = mainimg
                search.maindesc = maindesc
                search.firstimg = firstimg
                search.firstdesc = firstdesc
                search.secondimg = secondimg
                search.seconddesc = seconddesc
                search.lastimg = lastimg
                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
    async updateURLMobileAPP(zone){
        const android = zone.android
        const apple = zone.apple
        const capter = zone.capter
        try{
            const search = await MobileApp.findOne({where: {capter}})
            if(search){
                search.android = android
                search.apple = apple

                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
    async plusZoneSlider(zone){
        const name = zone.name
        const desc = zone.desc
        const capter = zone.capter
        const priory = zone.priory
        const image = zone.image
        try{
            const created = await ZonesSlider.create({
                name,
                desc,
                capter,
                priory,
                image
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async getZonesSlides(capter){

        const com = capter.capter
        try{
            const places = await ZonesSlider.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async editprioryzoneslider(zone){
        const id = zone.id
        const priory = zone.priory
        try{
            const search = await ZonesSlider.findOne({where: {id: id}})
            if(search){
                search.priory = priory
                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
    async delZoneSlider(zone){
        const id = zone.id
        const deleted = await ZonesSlider.findByPk(id)
        return await deleted.destroy()
    }
    async getProgramsSlides(capter){

        const com = capter.capter
        try{
            const places = await ProgramSlider.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async getProgramsPage(capter){

        const com = capter.capter
        try{
            const places = await ProgramTrain.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async getTrenersMan(capter){

        const com = capter.capter
        try{
            const places = await OurTrainers.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async plusProgramSlider(zone){
        const name = zone.name
        const room = zone.desc
        const capter = zone.capter
        const image = zone.image
        try{
            const created = await ProgramSlider.create({
                name,
                room,
                capter,
                image
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async plusProgramPage(zone){
        const name = zone.name
        const desc = zone.desc
        const room = zone.room
        const capter = zone.capter
        const image = zone.image
        try{
            const created = await ProgramTrain.create({
                name,
                desc,
                room,
                capter,
                image
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async plusTrenersGroup(group){
        const name = group.name
        const desc = group.desc
        const capter = group.capter
        try{
            const created = await GroupTrainers.create({
                name,
                desc,
                capter
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async plusTrenerMan(man){
        const image = man.image
        const room = man.room
        const name = man.name
        const group = man.group
        const desc = man.desc
        const stazh = man.stazh
        const capter = man.capter

        try{
            const created = await OurTrainers.create({
                image,
                room,
                name,
                group,
                desc,
                stazh,
                capter
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async getTrenersGroup(capter){

        const com = capter.capter
        try{
            const places = await GroupTrainers.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async delProgramSlider(zone){
        const id = zone.id
        const deleted = await ProgramSlider.findByPk(id)
        return await deleted.destroy()
    }
    async delProgramPage(zone){
        const id = zone.id
        const deleted = await ProgramTrain.findByPk(id)
        return await deleted.destroy()
    }
    async delTrenersGroup(zone){
        const id = zone.id
        const deleted = await GroupTrainers.findByPk(id)
        return await deleted.destroy()
    }
    async delTrenerMan(zone){
        const id = zone.id
        const deleted = await OurTrainers.findByPk(id)
        return await deleted.destroy()
    }
    async delPacks(zone){
        const id = zone.id
        const deleted = await PacksKids.findByPk(id)
        return await deleted.destroy()
    }
    async getAllPticesAvia(capter){

        const com = capter.capter
        try{
            const places = await PricesAvia.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async getProgramsAvia(capter){

        const com = capter.capter
        try{
            const places = await ProgramLessons.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async createPriceAvia(program){

        const capter = program.capter
        const name = program.name
        const description = program.description
        const priceour = program.priceour
        const priceyour = program.priceyour
        const time = program.time
        const theory = program.theory
        const practice = program.practice
        const programs = program.programs
        const discounts = program.discounts
        try{
            const created = await PricesAvia.create({
                capter,
                name,
                description,
                priceour,
                priceyour,
                time,
                theory,
                practice,
                programs,
                discounts,
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async editPriceAvia(program){
        const id = program.id
        const name = program.name
        const description = program.description
        const priceour = program.priceour
        const priceyour = program.priceyour
        const time = program.time
        const theory = program.theory
        const practice = program.practice
        const programs = program.programs
        const discounts = program.discounts
        try{
            const search = await PricesAvia.findOne({where: {id}})
            if(search){
                search.name = name
                search.description = description
                search.priceour = priceour
                search.priceyour = priceyour
                search.time = time
                search.theory = theory
                search.practice = practice
                search.programs = programs
                search.discounts = discounts

                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
    async delPrice(program){
        const id = program.id
        const deleted = await PricesAvia.findByPk(id)
        return await deleted.destroy()
    }
    async editPrioryPrice(priory){

        const id = priory.id
        const value = priory.priory
        try{
            const pack = await PricesAvia.findByPk(id)
            pack.priory = +value
            await pack.save()
            return pack
        }catch(e){
            console.log(e)
        }
    }
    async createTeacherAvia(teacher){

        const name = teacher.name
        const dev = teacher.dev
        const desc = teacher.desc
        const photo = teacher.image
        const capter = teacher.capter
        try{
            const created = await TeachersAvia.create({
                name,
                dev,
                desc,
                photo,
                capter,
                priory: 0
            })
            return created
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async getTeachersAvia(capter){

        const com = capter.company
        try{
            const places = await TeachersAvia.findAll({
                where: { capter: com },
                order: [['id', 'DESC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async prioryTeachersAvia(priory){

        const id = priory.id
        const value = priory.priory
        try{
            const pack = await TeachersAvia.findByPk(id)
            pack.priory = +value
            await pack.save()
            return pack
        }catch(e){
            console.log(e)
        }
    }

    async editTeacherAvia(teacher){

        const id = teacher.id
        const name = teacher.name
        const dev = teacher.dev
        const desc = teacher.desc
        const photo = teacher.image
        try{
            const search = await TeachersAvia.findByPk(id)
            search.name = name
            search.dev = dev
            search.desc = desc
            search.photo = photo
            await search.save()
            return search
        }catch(e){
            console.log(e)
        }
        return ''
    }
    async delTeacherAvia(teacher){
        const id = teacher.id
        const deleted = await TeachersAvia.findByPk(id)
        return await deleted.destroy()
    }
    async getLearnTeory(capter){

        const com = capter.capter
        console.log(capter)
        try{

            const places = await LearnTheory.findOne({
                where: { capter: com },
            });

            if(places){
                console.log('!! - Здесь  !!')
                return places
            }else{

                console.log('!! - Тут  !!')
                const created = await LearnTheory.create({
                    capter: com,
                    learn: [],
                    theory: {
                        desc: '',
                        list: []
                    }


                })
                return created
            }
        }catch(e){
            console.log(e)
        }
    }
    async editTheoryDesc(theory) {
        const { capter, desc } = theory; // Деструктуризация для удобства

        try {
            // Находим запись по значению capter
            const search = await LearnTheory.findOne({ where: { capter } });

            if (!search) {
                throw new Error(`Запись с capter: "${capter}" не найдена.`);
            }

            // Обновляем поле theory
            search.theory = desc;
            await search.save();

            return search;
        } catch (e) {
            console.error("Ошибка при обновлении теории:", e.message);
            throw e; // Рекомендуется пробросить ошибку дальше, если нужно обработать её выше
        }
    }
    async createListLeart(points) {
        const { capter, learn } = points; // Деструктуризация для удобства

        try {
            // Находим запись по значению capter
            const search = await LearnTheory.findOne({ where: { capter } });


            // Обновляем поле theory
            search.learn = learn;
            await search.save();

            return search;
        } catch (e) {
            console.error("Ошибка при обновлении теории:", e.message);
            throw e; // Рекомендуется пробросить ошибку дальше, если нужно обработать её выше
        }
    }
    async createListTheory(points) {
        const { capter, desc } = points; // Деструктуризация для удобства

        try {
            // Находим запись по значению capter
            const search = await LearnTheory.findOne({ where: { capter } });


            // Обновляем поле theory
            search.theory = desc;
            await search.save();

            return search;
        } catch (e) {
            console.error("Ошибка при обновлении теории:", e.message);
            throw e; // Рекомендуется пробросить ошибку дальше, если нужно обработать её выше
        }
    }
}
module.exports = new NewsService()
