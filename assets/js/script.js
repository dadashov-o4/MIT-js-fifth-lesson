// How do we create our promise?


// function fetch() {
//     return new Promise()
//     // constructor (executor)   meselen new parametri
//     // new Promise ((resolve,reject)=>{})
//     // instance  (then,catch) sanki ramda hisseler yaradir
//     // fetch in promise qaytarmasinin esas sebebi arxada bele bir kodun yazilmasidir return new Promise()
// }


function fetchBlogs () {
    return new Promise((resolve,reject) => {
         // return dan sonra gelen kodlar islemir, sanki setiri qirir
    fetch("blogs.json")
    .then(cavab=>{
        if(!cavab.ok) {
            throw new Error("Faylin oxunmasinda problem yasanir")
        }

         return cavab.json()

    })
    // then parametr olaraq function alir
    // nida ! bizde inkar menasini bildirir
    // 200 (ok yeni tesdiq), 201, 400(bad request), 500(server error) vs...    http statuse codes
    // HTTP  hyper text transfer protocol 


    .then(bloglar => {
        localStorage.setItem("bloglarDepo", JSON.stringify(bloglar))
        resolve(bloglar)
        // web saytin yerli depolamasi
    })
    .catch(xeta => reject(xeta) )
})
   

}

// melumatlarin local storage den cekilmesi ucun algoritm sagidaki kimidir
function getDataFromLocalStorage() {
    // get parametri veririk se demeli hazir bir melumati elde edirik   bu cur function lar parametirsiz functionlar adlanir
    const blogs = localStorage.getItem( "bloglarDepo" )
    // 2 ayri function daxilinde eyni const deyeri isletmek olar   figurlu morterize onlari ayirir
    return blogs ? JSON.parse(blogs) : null
    // [] yerine null da yaza bilerik   yeni butun melumatlar [] icinde olaxaq amma [] yazanda ; unutmuruq
    // json parse yaznadan sonra melumatlar javascript diline cevrilir
    // bu cur if else yazilisi ternary operator adlanir
    // bu if in true cavabi melumatlarin artiq cekildiyini gorterir
}

function displayBlog(blogsParametr) {
    const blogYerleseceyiDiv = document.querySelector(".blog-right-side")
    blogYerleseceyiDiv.innerHTML = ''
    //  [] icine bazadaki melumatlar yerlesecek
    blogsParametr.forEach(birBlog => {
        const divElementi = document.createElement( 'div' )
        // <div></div>
        divElementi.classList.add("blog")
        // <div class="blog"></div>
        divElementi.innerHTML= `
        <span id="metadata"> ${birBlog.tarix} </span>
        <h3> ${birBlog.title} </h3>
        <a href="#" class="">Read the article</a>`

        blogYerleseceyiDiv.appendChild(divElementi)
        // bunlari div in icine yerlesdirir
    })
    
}
// DOM elementlerin yaradilmasi createElament appenChild classList.add 
// amma funksiyalarin var olmasi islediyi menasini vermir   onlari yuklemek lazimdi
document.addEventListener("DOMContentLoaded", loadData)
// const let hoisting qaydalarina tabe deyil yeni deyiseni/funksiyani sonradan vermeliyik
function loadData() {
    const blogs = getDataFromLocalStorage()
    if( blogs ){
        console.log("Bloglar yuklenir...")
        displayBlog(blogs)
    }
    else{
        console.log("Bloglar local storage de yoxdur. internete daxil olun")
        fetchBlogs()
        .then(sonMerheleBloglar => displayBlog(sonMerheleBloglar))
        // onfulfilled  artiq doldurulmus menasinda islenir
        .catch(xeta => console.log(`serverde gozlenilmez xeta ${xeta.message}`))
}
}

loadData()
// sehifenin yuklenmesini bildiren hadiseler  "load" ve "DOMContentLoaded"
// load - html documenti yuklenen zaman js ise dusur
// DOMContentLoaded - html documenti yuklenenden sonra js ise dusur





// fetchBlogs()


// function salamla() {
//     return
// }
// salamla()

// // void gosteriri ki function geriye hecne qaytarmir 
