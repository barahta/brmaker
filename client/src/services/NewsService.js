import $api from "../http"

export default class NewsService{
    static viewPost(){
        return $api.get('/views/news')
    }
    static createPost(post){
        return $api.post('/views/createpost', {post})
    }
    static getAUP(){
        return $api.get('/views/getaup')
    }
    static plusAUP(post){
        return $api.post('/views/plusaup', {post})
    }
    static updateManAUP(man){
        return $api.post('/views/updatemanaup', {man})
    }
    static delMan(man){
        return $api.post('/views/delman', {man})
    }
    static plusVideo(video){
        return $api.post('/views/plusvideo', {video})
    }
    static plusComVak(com){
        return $api.post('/views/pluscomvak', {com})
    }
    static getComVak(com){
        return $api.post('/views/getcomvak', {com})
    }
    static delComVak(com){
        return $api.post('/views/delcomvak', {com})
    }
    static createVak(vak){
        return $api.post('/views/createvak', {vak})
    }
    static getVakansii(){
        return $api.get('/views/getvakansii')
    }
    static editVak(vak){

        console.log(vak)
        return $api.post('/views/editvak', {vak})
    }
    static editOpenVak(vak){
        console.log(vak)
        return $api.post('/views/editopenvak', {vak})
    }
    static delTisVak(vak){

        console.log(vak)
        return $api.post('/views/deltisvak', vak)
    }


    static getAbout(com){
        return $api.post('/views/getabout', {com})
    }
    static saveAbout(about){
        return $api.post('/views/saveabout', {about})
    }
    static plusCompany(com){
        return $api.post('/views/pluscompany', {com})
    }
    static getGroupCompanyes(){
        return $api.get('/views/getgroupcompanyes')
    }
    static delComGroup(com){
        return $api.post('/views/delcomgroup', {com})
    }
    static editСomGroup(com){
        return $api.post('/views/editcomgroup', {com})
    }
    static updatePosComGroup(com){
        return $api.post('/views/updateposcomgroup', {com})
    }
    static getPlaces(act){
        return $api.post('/views/getplaces', {act})
    }
    static plusPlaces(place){
        return $api.post('/views/plusplaces', {place})
    }
    static delPlace(id){
        return $api.post('/views/delplace', id)
    }
    static createPack(pack){
        return $api.post('/views/createpack', pack)
    }
    static getAllPacks(capter){
        return $api.post('/views/getallpacks', capter)
    }
    static editPrioryPack(priory){
        return $api.post('/views/editpriorypack', priory)
    }
    static updatePack(pack){
        return $api.post('/views/updatepack', pack)
    }
    static createImgGallery(pack){
        return $api.post('/views/createimggallery', pack)
    }
    static getGalleryImgs(capter){
        return $api.post('/views/getgalleryimgs', capter)
    }
    static deleteImgGalary(image){
        return $api.post('/views/deleteimggalary', image)
    }
    static getCities(capter){
        return $api.post('/views/getcities', capter)
    }
    static createCity(contact){
        return $api.post('/views/createcity', contact)
    }
    static uploadStaticContact(contact){
        return $api.post('/views/uploadstaticcontact', contact)
    }
    static plusContactParam(contact){
        return $api.post('/views/pluscontactparam', contact)
    }
    static createZone(zone){
        return $api.post('/views/createzone', zone)
    }
    static getZones(capter){
        return $api.post('/views/getzones', capter)
    }
    static updateZone(zone){
        return $api.post('/views/updatezone', zone)
    }
    static plusZoneSlider(zone){
        return $api.post('/views/pluszoneslider', zone)
    }
    static getZonesSlides(zone){
        return $api.post('/views/getzonesslides', zone)
    }
    static editPrioryZoneSlider(zone){
        return $api.post('/views/editprioryzoneslider', zone)
    }
    static delZoneSlider(zone){
        return $api.post('/views/delzoneslider', zone)
    }
    static getProgramsSlides(zone){
        return $api.post('/views/getprogramsslides', zone)
    }
    static plusProgramSlider(zone){
        return $api.post('/views/plusprogramslider', zone)
    }
    static delProgramSlider(zone){
        return $api.post('/views/delprogramslider', zone)
    }
    static getProgramsPage(zone){
        return $api.post('/views/getprogramspage', zone)
    }
    static plusProgramPage(zone){
        return $api.post('/views/plusprogrampage', zone)
    }
    static delProgramPage(zone){
        return $api.post('/views/delprogrampage', zone)
    }
    static plusTrenersGroup(zone){
        return $api.post('/views/plustrenersgroup', zone)
    }
    static getTrenersGroup(zone){
        return $api.post('/views/gettrenersgroup', zone)
    }
    static delTrenersGroup(zone){
        return $api.post('/views/deltrenersgroup', zone)
    }
    static plusTrenerMan(zone){
        return $api.post('/views/plustrenerman', zone)
    }
    static getTrenersMan(zone){
        return $api.post('/views/gettrenersman', zone)
    }
    static delTrenerMan(zone){
        return $api.post('/views/deltrenerman', zone)
    }
    static delPacks(zone){
        return $api.post('/views/delpacks', zone)
    }
    static getMobileURLs(capter){
        return $api.post('/views/getmobileurls', capter)
    }
    static updateURLMobileAPP(capter){
        return $api.post('/views/updateurlmobileapp', capter)
    }
    static getAllPticesAvia(capter){
        return $api.post('/views/getallpticesavia', capter)
    }
    static getProgramsAvia(capter){
        return $api.post('/views/getprogramsavia', capter)
    }
    static createPriceAvia(program){
        return $api.post('/views/createpriceavia', program)
    }
    static editPriceAvia(program){
        return $api.post('/views/editpriceavia', program)
    }
    static delPrice(program){
        return $api.post('/views/delprice', program)
    }
    static delNewsPost(news){
        return $api.post('/views/delnewspost', news)
    }
    static updatePost(news){
        return $api.post('/views/updatepost', news)
    }
    static reversePrioryAUP(news){
        return $api.post('/views/reverseprioryaup', news)
    }
    static editPrioryPrice(priory){
        return $api.post('/views/editprioryprice', priory)
    }
    static createTeacherAvia(teacher){
        return $api.post('/views/createteacheravia', teacher)
    }
    static getTeachersAvia(capter){
        return $api.post('/views/getteachersavia', capter)
    }
    static prioryTeachersAvia(teacher){
        return $api.post('/views/prioryteachersavia', teacher)
    }
    static editTeacherAvia(teacher){
        return $api.post('/views/editteacheravia', teacher)
    }
    static delTeacherAvia(teacher){
        return $api.post('/views/delteacheravia', teacher)
    }
    static getLearnTeory(capter){
        return $api.post('/views/getlearnteory', capter)
    }
    static editTheoryDesc(capter){
        return $api.post('/views/edittheorydesc', capter)
    }
    static createListLeart(capter){
        return $api.post('/views/createlistleart', capter)
    }
    static createListTheory(capter){
        return $api.post('/views/createlisttheory', capter)
    }




}